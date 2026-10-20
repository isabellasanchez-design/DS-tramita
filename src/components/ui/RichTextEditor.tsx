"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  LinkIcon,
  ListBulletsIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export type EditorVariable = { label: string; token: string };

export type RichTextEditorProps = {
  label: ReactNode;
  required?: boolean;
  /** HTML inicial. */
  defaultValue?: string;
  onChange?: (html: string) => void;
  /** Botones para insertar variables, p. ej. { label: "Prestador", token: "{{nombre_prestador}}" }. */
  variables?: EditorVariable[];
  className?: string;
};

type Command = "bold" | "underline" | "italic" | "link" | "insertUnorderedList";

// Orden visual de Figma: B, U, I, enlace, lista. (En Figma las capas "Italic"
// y "Underline" tienen los íconos cruzados; aquí cada botón hace lo que muestra.)
const tools: { command: Command; label: string; icon: ReactNode; toggle: boolean }[] = [
  { command: "bold", label: "Negrita", icon: <TextBIcon />, toggle: true },
  { command: "underline", label: "Subrayado", icon: <TextUnderlineIcon />, toggle: true },
  { command: "italic", label: "Cursiva", icon: <TextItalicIcon />, toggle: true },
  { command: "link", label: "Insertar enlace", icon: <LinkIcon />, toggle: false },
  { command: "insertUnorderedList", label: "Lista con viñetas", icon: <ListBulletsIcon />, toggle: true },
];

// Rich Text Editor del D.S. Tramita (03_Comunicaciones en Figma). La barra
// sigue el patrón "toolbar" de WAI-ARIA: un solo botón en el orden de Tab y
// flechas para moverse entre los demás. El área de texto es contentEditable
// con role="textbox" y aria-multiline. Figma no define foco: se usa el del navegador.
export function RichTextEditor({ label, required, defaultValue = "", onChange, variables = [], className = "" }: RichTextEditorProps) {
  const id = useId();
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Record<string, boolean>>({});
  const [toolIndex, setToolIndex] = useState(0);
  const [linkOpen, setLinkOpen] = useState(false);
  const [url, setUrl] = useState("");
  const savedRange = useRef<Range | null>(null);
  const toolCount = tools.length + variables.length;

  function refreshState() {
    setActive({
      bold: document.queryCommandState("bold"),
      underline: document.queryCommandState("underline"),
      italic: document.queryCommandState("italic"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
    });
  }

  function emit() {
    onChange?.(editorRef.current?.innerHTML ?? "");
  }

  function run(command: Command) {
    if (command === "link") {
      const selection = window.getSelection();
      savedRange.current = selection && selection.rangeCount ? selection.getRangeAt(0) : null;
      setLinkOpen(true);
      return;
    }
    editorRef.current?.focus();
    document.execCommand(command);
    refreshState();
    emit();
  }

  function insertLink() {
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (savedRange.current && selection) {
      selection.removeAllRanges();
      selection.addRange(savedRange.current);
    }
    if (url) {
      if (selection && selection.isCollapsed) document.execCommand("insertHTML", false, `<a href="${encodeURI(url)}">${url}</a>`);
      else document.execCommand("createLink", false, url);
    }
    setLinkOpen(false);
    setUrl("");
    emit();
  }

  function insertVariable(token: string) {
    editorRef.current?.focus();
    document.execCommand("insertText", false, token);
    emit();
  }

  function onToolbarKey(event: KeyboardEvent<HTMLDivElement>) {
    const next =
      event.key === "ArrowRight"
        ? (toolIndex + 1) % toolCount
        : event.key === "ArrowLeft"
          ? (toolIndex - 1 + toolCount) % toolCount
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? toolCount - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setToolIndex(next);
    toolbarRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span id={`${id}-label`} className="flex gap-1 text-base leading-[19px] text-[#202025]">
        {label}
        {required ? (
          <span aria-hidden className="font-bold text-[#b4181d]">
            *
          </span>
        ) : null}
      </span>

      <div
        ref={toolbarRef}
        role="toolbar"
        aria-label="Formato del texto"
        aria-controls={`${id}-editor`}
        onKeyDown={onToolbarKey}
        className="flex flex-wrap items-center gap-[17px] border border-b-0 border-[#d8d9de] bg-[#e4e5f4] px-6 py-3"
      >
        {tools.map((tool, i) => (
          <button
            key={tool.command}
            type="button"
            tabIndex={i === toolIndex ? 0 : -1}
            aria-label={tool.label}
            aria-pressed={tool.toggle ? Boolean(active[tool.command]) : undefined}
            // mousedown no quita el foco ni la selección del editor.
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setToolIndex(i);
              run(tool.command);
            }}
            className={`inline-flex size-[18px] cursor-pointer items-center justify-center rounded-[2px] text-[#1b2159] [&>svg]:size-4 ${
              active[tool.command] ? "bg-white" : ""
            }`}
          >
            {tool.icon}
          </button>
        ))}
        {variables.length ? <span aria-hidden className="h-[18px] w-px bg-[#d8d9de]" /> : null}
        {variables.map((variable, i) => (
          <button
            key={variable.token}
            type="button"
            tabIndex={tools.length + i === toolIndex ? 0 : -1}
            aria-label={`Insertar variable ${variable.label}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setToolIndex(tools.length + i);
              insertVariable(variable.token);
            }}
            className="cursor-pointer text-xs font-bold leading-[14px] text-[#454b78]"
          >
            {"{ }"} {variable.label}
          </button>
        ))}
      </div>

      {linkOpen ? (
        <div className="flex flex-wrap items-end gap-2 border border-b-0 border-[#d8d9de] bg-white px-6 py-3">
          <Input
            autoFocus
            className="min-w-[220px] flex-1"
            label="URL del enlace"
            type="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                insertLink();
              }
              if (event.key === "Escape") setLinkOpen(false);
            }}
            placeholder="https://"
          />
          <Button size="Small" onClick={insertLink}>
            Insertar
          </Button>
          <Button size="Small" variant="Tertiary" onClick={() => setLinkOpen(false)}>
            Cancelar
          </Button>
        </div>
      ) : null}

      <div
        ref={editorRef}
        id={`${id}-editor`}
        role="textbox"
        aria-multiline="true"
        aria-labelledby={`${id}-label`}
        aria-required={required || undefined}
        contentEditable
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: defaultValue }}
        onInput={emit}
        onKeyUp={refreshState}
        onMouseUp={refreshState}
        className="min-h-[200px] whitespace-pre-wrap border border-[#d8d9de] bg-white px-6 py-8 text-sm leading-4 text-[#1b2159] [&_a]:text-[#2a32a2] [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5"
      />
    </div>
  );
}
