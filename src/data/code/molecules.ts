// HTML y CSS de referencia de las moléculas, con los valores de Figma.
// Son la versión sin React de los componentes de src/components/ui.

export const buttonHtml = `<button type="button" class="btn-primary">
  <svg width="20" height="20" aria-hidden="true"><!-- CaretCircleLeft --></svg>
  Continuar
</button>

<!-- Solo ícono: necesita aria-label -->
<button type="button" class="btn-tertiary" aria-label="Siguiente">
  <svg width="20" height="20" aria-hidden="true"><!-- CaretCircleRight --></svg>
</button>

<!-- Loading: no usar disabled, para no perder el foco -->
<button type="submit" class="btn-primary" aria-busy="true" aria-disabled="true">
  <!-- indicador de progreso de 20px, aria-hidden -->
  <span class="sr-only">Enviar solicitud</span>
</button>`;

export const textboxHtml = `<div class="field">
  <label class="field-label" for="correo">
    Correo electrónico <span class="field-required" aria-hidden="true">*</span>
  </label>
  <div class="field-box">
    <input class="field-control" id="correo" type="email" required
      placeholder="nombre@correo.com" aria-describedby="correo-message" />
  </div>
  <p class="field-message" id="correo-message">Te enviaremos la confirmación del trámite.</p>
</div>

<!-- Error: clase is-error en el campo y aria-invalid en el input -->
<div class="field is-error">
  <label class="field-label" for="nit">NIT</label>
  <div class="field-box">
    <input class="field-control" id="nit" aria-invalid="true" aria-describedby="nit-message" value="9001" />
  </div>
  <p class="field-message" id="nit-message">El NIT debe tener 9 dígitos.</p>
</div>`;

export const textboxCss = `
.field { display: flex; flex-direction: column; gap: 4px; }
.field-label { display: flex; gap: 4px; font-size: 16px; color: #202025; }
.field-required { font-weight: 700; color: #b4181d; }
.field-box { display: flex; align-items: center; gap: 6px; height: 36px; padding: 0 8px; border: 1px solid #e4e5f4; border-radius: 4px; background: #ffffff; }
.field-box:focus-within { border-color: #2a32a2; box-shadow: 0 0 0 1px #2a32a2; }
.field-control { flex: 1; min-width: 0; padding: 0 4px; border: 0; background: transparent; font: 400 16px/1.2 Roboto, sans-serif; color: #202025; outline: none; }
.field-control::placeholder { color: #9496a8; }
.field-control:focus-visible { color: #2a32a2; }
.field-box:has(.field-control:disabled) { border-color: transparent; background: #ebebed; }
.field-control:disabled { color: #484956; cursor: not-allowed; }
.field-message { font-size: 14px; color: #484956; }
.field.is-error .field-box { border-color: #b4181d; }
.field.is-error .field-message { color: #b4181d; }
.field.is-success .field-box { border-color: #28a44b; }
.field.is-success .field-message { color: #12331b; }
`;

export const tooltipHtml = `<span class="tooltip-anchor">
  <button type="button" aria-label="Descargar" aria-describedby="tip-descargar">
    <svg aria-hidden="true"><!-- DownloadSimple --></svg>
  </button>
  <span class="tooltip tooltip--center-bottom" role="tooltip" id="tip-descargar">
    Descarga el comprobante en PDF
  </span>
</span>

<!-- Mostrar con hover y focus; cerrar con Escape (WCAG 1.4.13). -->`;

export const tooltipCss = `
.tooltip-anchor { position: relative; display: inline-flex; }
.tooltip { position: absolute; z-index: 50; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%); width: max-content; max-width: 290px; padding: 8px 12px; border-radius: 8px; background: #1c2057; color: #ffffff; font-size: 12px; line-height: 14px; box-shadow: 0 6px 6px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.25); display: none; }
.tooltip-anchor:hover .tooltip, .tooltip-anchor:focus-within .tooltip { display: block; }
.tooltip--center-bottom::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -6px; border: 6px solid transparent; border-bottom: 0; border-top-color: #1c2057; }
`;

export const alertHtml = `<div class="alert alert--warning" role="alert">
  <div class="alert-row">
    <svg class="alert-icon" aria-hidden="true"><!-- CheckCircle --></svg>
    <p class="alert-text">Tu solicitud vence en 3 días.</p>
    <button type="button" class="alert-close" aria-label="Cerrar">
      <svg aria-hidden="true"><!-- X --></svg>
    </button>
  </div>
  <div class="alert-actions">
    <button type="button" class="alert-action">Revisar</button>
    <button type="button" class="alert-action alert-action--secondary">Más tarde</button>
  </div>
</div>

<!-- Toast: role="status" (o "alert" si es Error); no se cierra solo. -->
<div class="alert alert--success" role="status">
  <div class="alert-row">
    <svg class="alert-icon" aria-hidden="true"><!-- SealCheck --></svg>
    <p class="toast-title">Solicitud enviada</p>
    <button type="button" class="alert-close" aria-label="Cerrar"><svg aria-hidden="true"></svg></button>
  </div>
  <p class="toast-body">Te avisaremos por correo cuando cambie de estado.</p>
</div>`;

export const alertCss = `
.alert { display: flex; flex-direction: column; gap: 16px; padding: 20px 12px; border-radius: 8px; color: #202025; }
.alert-row { display: flex; align-items: flex-start; gap: 8px; }
.alert-icon { width: 20px; height: 20px; flex-shrink: 0; }
.alert-text { flex: 1; font-size: 16px; line-height: 19px; }
.alert-close { width: 24px; height: 24px; border: 0; background: none; color: inherit; cursor: pointer; }
.alert-actions { display: flex; gap: 16px; padding-left: 24px; }
.alert-action { height: 44px; padding: 0 16px; border: 0; border-radius: 20px; color: #ffffff; font-size: 16px; cursor: pointer; }
.alert-action--secondary { border: 1px solid currentColor; background: #ffffff; }
.toast-title { flex: 1; font-size: 18px; font-weight: 700; line-height: 21px; }
.toast-body { padding-left: 32px; font-size: 16px; color: #484956; }
.alert--success { background: #e4f4e8; }
.alert--success .alert-icon { color: #227c3c; }
.alert--success .alert-action { background: #227c3c; }
.alert--error { background: #f6e1e2; }
.alert--error .alert-icon { color: #b4181d; }
.alert--error .alert-action { background: #88161a; }
.alert--warning { background: #f7efe0; }
.alert--warning .alert-icon { color: #8d6011; }
.alert--warning .alert-action { background: #8d6011; }
.alert--warning .alert-action--secondary { background: #ffffff; color: #8d6011; }
.alert--pending { background: #e2ebf6; }
.alert--pending .alert-icon { color: #1e5cae; }
.alert--waiting { background: #ebebed; }
.alert--waiting .alert-icon { color: #5c5d70; }
.alert--marca { background: linear-gradient(90deg, rgba(74, 209, 111, 0.4), rgba(26, 31, 107, 0.4)); }
.alert--solid { color: #ffffff; }
.alert--solid.alert--error { background: #e31c23; }
.alert--solid.alert--success { background: #28a44b; }
`;

export const informationBarHtml = `<div class="info-bar">
  <div class="info-bar-content">
    <svg class="info-bar-icon" aria-hidden="true"><!-- Lightning --></svg>
    <p>El sábado 25 de octubre la plataforma no estará disponible de 6:00 a 10:00 a. m.</p>
  </div>
  <button type="button" class="info-bar-close" aria-label="Cerrar">
    <svg aria-hidden="true"><!-- X --></svg>
  </button>
</div>`;

export const informationBarCss = `
.info-bar { display: flex; align-items: flex-start; gap: 16px; padding: 12px 32px; background: linear-gradient(90deg, #4ad16f 0%, #1a1f6b 100%); color: #ffffff; font-size: 16px; line-height: 19px; }
.info-bar-content { display: flex; flex: 1; align-items: flex-start; gap: 8px; }
.info-bar-icon { width: 16px; height: 16px; flex-shrink: 0; }
.info-bar-close { width: 24px; height: 24px; border: 0; background: none; color: inherit; cursor: pointer; }
.info-bar-close:focus-visible { outline: 2px solid #ffffff; }
`;

export const paginationHtml = `<nav aria-label="Paginación">
  <ul class="pagination">
    <li><button type="button" class="btn-outline">Anterior</button></li>
    <li><button type="button" class="btn-tertiary" aria-label="Página 1">1</button></li>
    <li><button type="button" class="btn-outline" aria-label="Página 2" aria-current="page">2</button></li>
    <li><button type="button" class="btn-tertiary" aria-label="Página 3">3</button></li>
    <li><button type="button" class="btn-outline">Siguiente</button></li>
  </ul>
</nav>

<!-- Los botones usan las clases de Botones (.btn-outline, .btn-tertiary). -->`;

export const paginationCss = `
.pagination { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 0; list-style: none; }
`;

export const tabsHtml = `<div class="tabs">
  <div class="tabs-list" role="tablist" aria-label="Detalle de la solicitud">
    <button class="tab" role="tab" id="tab-datos" aria-selected="true" aria-controls="panel-datos" tabindex="0">Datos</button>
    <button class="tab" role="tab" id="tab-docs" aria-selected="false" aria-controls="panel-docs" tabindex="-1">Documentos</button>
  </div>
  <div class="tab-panel" role="tabpanel" id="panel-datos" aria-labelledby="tab-datos" tabindex="0">…</div>
  <div class="tab-panel" role="tabpanel" id="panel-docs" aria-labelledby="tab-docs" tabindex="0" hidden>…</div>
</div>

<!-- Flechas izquierda/derecha cambian de pestaña; Inicio y Fin van a los extremos. -->`;

export const tabsCss = `
.tabs-list { display: flex; width: 100%; }
.tab { flex: 1; padding: 16px 8px; border: 0; background: none; font-size: 16px; line-height: 19px; color: #5c5d70; box-shadow: inset 0 -1px 0 #d8d9de; cursor: pointer; }
.tab[aria-selected="true"] { font-weight: 700; color: #2a32a2; box-shadow: inset 0 -4px 0 #2a32a2; }
.tab-panel { padding-top: 16px; }
`;
