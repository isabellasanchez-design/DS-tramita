// HTML y CSS de referencia de los organismos, con los valores de Figma.
// Son la versión sin React de los componentes de src/components/ui.

export const cardHtml = `<!-- .tag y .btn-outline vienen de las páginas de Tags y Botones. -->
<article class="card">
  <img class="card-image" src="servicio.png" alt="" />
  <span class="card-icon" aria-hidden="true"><svg><!-- Paperclip --></svg></span>
  <ul class="card-tags"><li class="tag">Nuevo</li></ul>
  <h3 class="card-title">
    <a href="/tramites/registro-de-marca">Registro de marca</a>
  </h3>
  <p class="card-text">Protege el nombre y el logo de tu empresa.</p>
  <div class="card-footer">
    <span class="tag tag--success">Disponible</span>
    <button type="button" class="btn-outline">Iniciar trámite</button>
  </div>
</article>`;

export const cardCss = `
.card { position: relative; display: flex; flex-direction: column; gap: 20px; padding: 24px; border: 1px solid transparent; border-radius: 16px; background: #ffffff; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.07); }
.card:hover { background: #e4e5f4; }
.card:has(a:active) { border-color: #2a32a2; }
.card-image { width: 100%; height: 170px; border-radius: 12px; object-fit: cover; }
.card-icon { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background: #e4e5f4; color: #2a32a2; }
.card-tags { display: flex; flex-wrap: wrap; gap: 20px; padding: 0; list-style: none; }
.card-title { font-size: 18px; font-weight: 700; line-height: 21px; color: #2a32a2; }
.card-title a { color: inherit; text-decoration: none; }
.card-title a::after { content: ""; position: absolute; inset: 0; border-radius: 16px; }
.card-text { font-size: 14px; line-height: 16px; color: #484956; }
.card-footer { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-top: 24px; }
.card-footer button { position: relative; z-index: 1; }
.card--disabled { border-color: #9496a8; background: #ebebed; box-shadow: none; }
`;

export const dropdownHtml = `<label id="ciudad-label" for="ciudad">Ciudad</label>
<div class="dropdown">
  <button type="button" id="ciudad" class="dropdown-trigger" role="combobox"
    aria-haspopup="listbox" aria-expanded="true" aria-controls="ciudad-list"
    aria-activedescendant="ciudad-opt-2">Selecciona una ciudad</button>
  <ul class="dropdown-list" id="ciudad-list" role="listbox" aria-labelledby="ciudad-label">
    <li class="dropdown-option" id="ciudad-opt-1" role="option" aria-selected="true">Bogotá</li>
    <li class="dropdown-option is-active" id="ciudad-opt-2" role="option" aria-selected="false">Medellín</li>
  </ul>
</div>

<!-- Teclado: flechas, Inicio, Fin, Enter, Escape y búsqueda por letra. -->`;

export const dropdownCss = `
.dropdown { position: relative; }
.dropdown-trigger { display: flex; align-items: center; width: 100%; height: 36px; padding: 0 8px; border: 1px solid #e4e5f4; border-radius: 4px; background: #ffffff; font-size: 16px; color: #202025; text-align: left; cursor: pointer; }
.dropdown-list { position: absolute; inset-inline: 0; top: calc(100% + 4px); z-index: 40; max-height: 344px; overflow-y: auto; padding: 0; border-radius: 8px; background: #ffffff; list-style: none; }
.dropdown-option { display: flex; align-items: center; gap: 8px; padding: 12px 8px; font-size: 14px; line-height: 16px; color: #202025; box-shadow: inset 0 1px 0 #d8d9de; cursor: pointer; }
.dropdown-option:hover { background: #e4e5f4; }
.dropdown-option.is-active { background: #e4e5f4; box-shadow: inset 0 0 0 2px #2a32a2; }
.dropdown-option[aria-selected="true"] { font-weight: 700; }
`;

export const menuHtml = `<aside class="sidebar">
  <img class="sidebar-logo" src="tramita-logotipo-blanco.png" alt="Tramita" />
  <nav aria-label="Menú principal">
    <div role="group" aria-labelledby="sec-param">
      <p class="sidebar-section" id="sec-param">Parametrización</p>
      <ul class="sidebar-list">
        <li><a class="sidebar-item" href="/" aria-current="page"><svg aria-hidden="true"></svg>Inicio</a></li>
        <li><a class="sidebar-item" href="/servicios"><svg aria-hidden="true"></svg>Servicios de atención</a></li>
      </ul>
    </div>
  </nav>
  <button type="button" class="sidebar-toggle" aria-expanded="true" aria-label="Cerrar menú">
    <svg aria-hidden="true"><!-- CaretCircleLeft --></svg>
  </button>
</aside>`;

export const menuCss = `
.sidebar { position: relative; display: flex; flex-direction: column; width: 255px; height: 100%; padding: 8px; background: linear-gradient(180deg, #1a1f6b 0%, #2830a6 46%, #2830a6 100%); }
.sidebar.is-closed { width: 48px; }
.sidebar-logo { height: 36px; margin: 8px; }
.sidebar-section { display: flex; align-items: center; height: 32px; padding: 0 8px; font-size: 12px; color: #ffffff; }
.sidebar-list { padding: 0; list-style: none; }
.sidebar-item { display: flex; align-items: center; gap: 8px; padding: 8px 32px 8px 8px; border-radius: 8px; font-size: 16px; line-height: 19px; color: #ffffff; text-decoration: none; }
.sidebar-item svg { width: 16px; height: 16px; }
.sidebar-item[aria-current="page"] { background: #e4e5f4; font-weight: 700; color: #2a32a2; }
.sidebar-toggle { position: absolute; top: 8px; right: -14px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border: 0; border-radius: 50%; background: #23297b; color: #ffffff; cursor: pointer; }
`;

export const popupHtml = `<!-- .btn-primary y .btn-outline vienen de la página de Botones. -->
<button type="button" id="abrir">Eliminar solicitud</button>

<dialog class="popup" aria-labelledby="popup-title" aria-describedby="popup-body">
  <span class="popup-icon popup-icon--error" aria-hidden="true"><svg><!-- Trash --></svg></span>
  <h2 class="popup-title popup-title--error" id="popup-title">¿Eliminar la solicitud?</h2>
  <p class="popup-body" id="popup-body">Esta acción no se puede deshacer.</p>
  <div class="popup-actions">
    <button type="button" class="btn-primary">Eliminar</button>
    <button type="button" class="btn-outline">Cancelar</button>
  </div>
  <button type="button" class="popup-close" aria-label="Cerrar"><svg aria-hidden="true"><!-- X --></svg></button>
</dialog>

<script>
  // showModal(): foco atrapado, Escape cierra y el resto de la página queda inerte.
  document.getElementById("abrir").onclick = () => document.querySelector(".popup").showModal();
</script>`;

export const popupCss = `
.popup { width: 480px; max-width: calc(100% - 32px); padding: 40px; border: 0; border-radius: 24px; background: #ffffff; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); text-align: center; }
.popup-icon { display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: 50%; background: #e4e5f4; color: #2a32a2; }
.popup-icon--error { background: #f6e1e2; color: #b4181d; }
.popup-title { margin-top: 16px; font-size: 24px; font-weight: 700; line-height: 30px; color: #2a32a2; }
.popup-title--error { color: #b4181d; }
.popup-body { margin-top: 16px; font-size: 16px; line-height: 19px; color: #484956; }
.popup-actions { display: flex; flex-direction: column; gap: 12px; padding-top: 32px; }
.popup-close { position: absolute; top: 24px; right: 24px; width: 24px; height: 24px; border: 0; background: none; color: #2a32a2; cursor: pointer; }
`;

export const stepperHtml = `<ol class="stepper" aria-label="Progreso del trámite">
  <li class="step step--completed">
    <span class="step-circle" aria-hidden="true"><svg><!-- Check --></svg></span>
    <span class="step-label"><span class="sr-only">Paso 1 de 3, completado: </span>Tipo de solicitud</span>
  </li>
  <li class="step step--current" aria-current="step">
    <span class="step-circle" aria-hidden="true">2</span>
    <span class="step-label"><span class="sr-only">Paso 2 de 3, actual: </span>Datos</span>
  </li>
  <li class="step">
    <span class="step-circle" aria-hidden="true">3</span>
    <span class="step-label"><span class="sr-only">Paso 3 de 3: </span>Documentos</span>
  </li>
</ol>`;

export const stepperCss = `
.stepper { display: flex; width: 100%; padding: 0; list-style: none; }
.step { position: relative; display: flex; flex: 1; flex-direction: column; align-items: center; gap: 4px; }
.step::before { content: ""; position: absolute; top: 16px; left: 0; right: 0; height: 2px; background: #e4e5f4; }
.step:first-child::before { left: 50%; }
.step:last-child::before { right: 50%; }
.step-circle { position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 50%; background: #e4e5f4; font-size: 12px; font-weight: 700; color: #5c5d70; }
.step-label { font-size: 12px; line-height: 14px; color: #5c5d70; text-align: center; }
.step--completed::before, .step--completed .step-circle { background: #28a44b; color: #ffffff; }
.step--completed .step-label { color: #12331b; }
.step--current::before, .step--current .step-circle { background: #23297b; color: #ffffff; }
.step--current .step-label { font-weight: 700; color: #1c2057; }
`;

export const uploaderHtml = `<div class="uploader">
  <label class="uploader-drop">
    <span class="uploader-icon" aria-hidden="true"><svg><!-- FileText duotone --></svg></span>
    <span class="uploader-text">
      <span>Seleccione un archivo o arrástrelo aquí</span>
      <small>Archivos en formato JPG, PNG o PDF. Peso máximo 10 MB</small>
    </span>
    <input class="sr-only" type="file" accept=".pdf,.jpg,.png" aria-label="RUT actualizado: Seleccione un archivo" />
  </label>
</div>

<!-- Con documento -->
<div class="uploader">
  <div class="uploader-file uploader-file--charged">
    <span class="uploader-icon" aria-hidden="true"><svg></svg></span>
    <span class="uploader-text">
      <strong>RUT_2025.pdf</strong>
      <small role="status">Cargado el 12/11/2025</small>
    </span>
    <button type="button" aria-label="Ver documento"><svg aria-hidden="true"><!-- Eye --></svg></button>
  </div>
</div>`;

export const uploaderCss = `
.uploader { padding: 8px; border-radius: 8px; background: #ffffff; box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.04); }
.uploader-drop { display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px dashed #c5c1d1; border-radius: 4px; background: #f3f4f9; cursor: pointer; }
.uploader-drop:has(input:focus-visible) { outline-style: auto; }
.uploader-icon { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 4px; background: #e4e5f4; color: #2a32a2; }
.uploader-text { display: flex; flex-direction: column; font-size: 16px; color: #202025; }
.uploader-text small { font-size: 12px; color: #5c5d70; }
.uploader-file { display: flex; align-items: center; gap: 12px; padding: 16px; border: 1px solid #c5c1d1; border-radius: 4px; }
.uploader-file strong { font-size: 14px; }
.uploader-file button { border: 0; background: none; color: #52565c; cursor: pointer; }
.uploader-file--review { border-color: #1e5cae; }
.uploader-file--charged { border-color: #28a44b; }
.uploader-file--charged .uploader-icon { background: #e4f4e8; color: #227c3c; }
.uploader-file--error { border-color: #bb7d11; }
.uploader-file--error .uploader-icon { background: #f7efe0; color: #8d6011; }
`;

export const treeHtml = `<ul class="tree" role="tree" aria-label="Plan de desarrollo">
  <li role="treeitem" aria-level="1" aria-expanded="true" aria-selected="true" tabindex="0">
    <div class="tree-row tree-row--root">
      <svg class="tree-caret" aria-hidden="true"></svg><svg class="tree-icon" aria-hidden="true"></svg>
      <span><span class="tree-code">AP-01</span> Gobernanza</span>
    </div>
    <ul role="group">
      <li role="treeitem" aria-level="2" aria-selected="false" tabindex="-1">
        <div class="tree-row tree-row--level-2">…</div>
      </li>
    </ul>
  </li>
</ul>

<!-- Teclado: flechas para moverse, derecha abre/baja, izquierda cierra/sube, Inicio, Fin, Enter. -->`;

export const treeCss = `
.tree, .tree ul { padding: 0; list-style: none; }
.tree-row { display: flex; align-items: center; gap: 8px; padding: 8px 16px; font-size: 14px; line-height: 16px; color: #202025; background: #f6f6f7; cursor: pointer; }
.tree-row--root { background: #ffffff; }
.tree-row--level-2 { padding-left: 56px; }
.tree-row--level-3 { padding-left: 80px; }
.tree-row--level-4 { padding-left: 104px; }
.tree-caret, .tree-icon { width: 16px; height: 16px; color: #333dcc; }
.tree-code { color: #484956; }
`;

export const timelineHtml = `<ol class="timeline" aria-label="Historial del turno">
  <li class="timeline-item">
    <span class="timeline-dot timeline-dot--l" aria-hidden="true"></span>
    <div class="timeline-content">
      <p class="timeline-title">Trámite cerrado</p>
      <p class="timeline-meta">09:52 AM • Funcionaria: María López</p>
      <p class="timeline-meta">Trámite de radicación finalizado exitosamente</p>
    </div>
  </li>
</ol>`;

export const timelineCss = `
.timeline { padding: 0; list-style: none; }
.timeline-item { position: relative; display: flex; gap: 8px; padding-bottom: 24px; }
.timeline-item::before { content: ""; position: absolute; top: 14px; bottom: 0; left: 9px; width: 2px; background: #ebebed; }
.timeline-item:last-child::before { display: none; }
.timeline-dot { flex-shrink: 0; width: 12px; height: 12px; margin: 2px 4px 0; border-radius: 50%; background: #ffffff; }
.timeline-dot--l { background: #5c5d70; }
.timeline-dot--m { background: #5c5d70; box-shadow: inset 0 0 0 1px #ffffff; }
.timeline-dot--s { background: #5c5d70; box-shadow: inset 0 0 0 3px #ffffff; }
.timeline-content { display: flex; flex-direction: column; gap: 4px; }
.timeline-title { font-size: 14px; font-weight: 700; line-height: 16px; color: #1c2057; }
.timeline-meta { font-size: 12px; line-height: 14px; color: #9496a8; }
`;

export const comunicacionesHtml = `<span id="contenido-label">Contenido de la comunicación</span>
<div class="rte-toolbar" role="toolbar" aria-label="Formato del texto" aria-controls="contenido">
  <button type="button" aria-label="Negrita" aria-pressed="false" tabindex="0"><svg aria-hidden="true"></svg></button>
  <button type="button" aria-label="Subrayado" aria-pressed="false" tabindex="-1"><svg aria-hidden="true"></svg></button>
  <button type="button" aria-label="Cursiva" aria-pressed="false" tabindex="-1"><svg aria-hidden="true"></svg></button>
  <span class="rte-divider" aria-hidden="true"></span>
  <button type="button" class="rte-variable" tabindex="-1">{ } Prestador</button>
</div>
<div class="rte-area" id="contenido" role="textbox" aria-multiline="true"
  aria-labelledby="contenido-label" contenteditable="true"></div>

<!-- Vista previa -->
<article class="email-preview" aria-label="Vista previa: Recordatorio de renovación">
  <header class="email-preview-header">
    <dl><dt>De</dt><dd>rnt@mincomercio.gov.co</dd><dt>Para</dt><dd>612 destinatarios</dd></dl>
    <h3>Recordatorio de renovación</h3>
  </header>
  <div class="email-preview-body">Estimado(a) María Rojas, …</div>
</article>`;

export const comunicacionesCss = `
.rte-toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 17px; padding: 12px 24px; border: 1px solid #d8d9de; border-bottom: 0; background: #e4e5f4; }
.rte-toolbar button { border: 0; background: none; color: #1b2159; cursor: pointer; }
.rte-toolbar button[aria-pressed="true"] { background: #ffffff; }
.rte-divider { width: 1px; height: 18px; background: #d8d9de; }
.rte-variable { font-size: 12px; font-weight: 700; color: #454b78; }
.rte-area { min-height: 200px; padding: 32px 24px; border: 1px solid #d8d9de; background: #ffffff; font-size: 14px; line-height: 16px; color: #1b2159; }
.email-preview-header { display: flex; flex-direction: column; gap: 8px; padding: 12px 24px; border: 1px solid #d8d9de; border-bottom: 0; background: #e4e5f4; font-size: 12px; color: #484956; }
.email-preview-header h3 { font-size: 14px; font-weight: 700; color: #2a32a2; }
.email-preview-body { padding: 32px 24px; border: 1px solid #d8d9de; font-size: 12px; line-height: 14px; color: #484956; white-space: pre-line; }
`;

export const indicatorsHtml = `<!-- .tag viene de la página de Tags. -->
<article class="kpi kpi--success" aria-label="Atendidos a tiempo">
  <div class="kpi-row">
    <p class="kpi-value">92%</p>
    <span class="tag tag--success">Cumplido</span>
  </div>
  <h3 class="kpi-title">Atendidos a tiempo</h3>
  <p class="kpi-text">Meta: 90%</p>
</article>

<table class="bar-list">
  <caption>Nuevos prestadores por actividad turística</caption>
  <thead class="sr-only"><tr><th scope="col">Actividad</th><th scope="col">Inscripciones</th></tr></thead>
  <tbody>
    <tr>
      <th scope="row">Alojamiento turístico</th>
      <td><span class="progress" aria-hidden="true"><span style="width: 100%"></span></span> 62</td>
    </tr>
  </tbody>
</table>

<span class="progress" role="progressbar" aria-label="Avance de la meta" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">
  <span style="width: 66%"></span>
</span>`;

export const indicatorsCss = `
.kpi { overflow: hidden; border: 1px solid #e1e3f3; border-radius: 14px; background: #ffffff; box-shadow: 0 8px 24px rgba(27, 33, 89, 0.12), 0 1px 2px rgba(27, 33, 89, 0.06); border-top: 4px solid #3140a6; padding: 16px 20px; }
.kpi--success { border-top-color: #17974c; }
.kpi--warning { border-top-color: #b06a08; }
.kpi--critical { border-top-color: #d6303f; }
.kpi-row { display: flex; align-items: center; justify-content: space-between; }
.kpi-value { font-size: 32px; font-weight: 700; line-height: 40px; color: #1c2057; }
.kpi-title { margin-top: 12px; font-size: 14px; font-weight: 700; color: #1c2057; }
.kpi-text { margin-top: 12px; font-size: 12px; color: #5c5d70; }
.bar-list { width: 100%; border-spacing: 0 16px; }
.bar-list caption { text-align: left; font-size: 14px; font-weight: 700; color: #1c2057; }
.bar-list th { width: 170px; text-align: left; font-size: 12px; font-weight: 700; color: #484956; }
.bar-list td { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 700; color: #5c5d70; }
.progress { display: block; flex: 1; height: 8px; overflow: hidden; border-radius: 999px; background: #e4e5f4; }
.progress > span { display: block; height: 100%; border-radius: 999px; background: #2a32a2; }
`;

export const tablaHtml = `<!-- .tag viene de la página de Tags; los filtros usan el Textbox. -->
<div role="search" class="table-filters">
  <label class="sr-only" for="buscar">Buscar por nombre del solicitante</label>
  <input id="buscar" type="search" placeholder="Escriba el nombre del solicitante" />
</div>

<div class="table-wrap">
  <table class="table">
    <caption class="sr-only">Trámites asignados</caption>
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending">
          <button type="button">Número radicado <svg aria-hidden="true"><!-- ArrowsDownUp --></svg></button>
        </th>
        <th scope="col">Estado</th>
        <th scope="col"><span class="sr-only">Ver detalle</span></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TH-2026-000005</td>
        <td><span class="tag tag--pending">En revisión</span></td>
        <td><a href="/tramites/TH-2026-000005" aria-label="Ver detalle de TH-2026-000005"><svg aria-hidden="true"></svg></a></td>
      </tr>
    </tbody>
  </table>
</div>`;

export const tablaCss = `
.table-wrap { overflow-x: auto; border-radius: 24px; }
.table { width: 100%; min-width: 720px; table-layout: fixed; border-collapse: separate; border-spacing: 0; text-align: left; }
.table th { padding: 16px; border-bottom: 1px solid #d8d9de; background: #e4e5f4; font-size: 12px; font-weight: 700; line-height: 14px; color: #484956; }
.table th button { display: inline-flex; align-items: center; gap: 12px; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
.table td { padding: 16px 24px; border-bottom: 1px solid #d8d9de; background: #ffffff; font-size: 14px; line-height: 16px; color: #202025; }
.table tr:hover td { background: #c9ccee; }
.table thead th:first-child { border-top-left-radius: 24px; }
.table thead th:last-child { border-top-right-radius: 24px; }
.table tbody tr:last-child td:first-child { border-bottom-left-radius: 24px; }
.table tbody tr:last-child td:last-child { border-bottom-right-radius: 24px; }
`;
