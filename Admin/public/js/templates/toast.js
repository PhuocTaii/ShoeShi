const toastTemplate = 
`
<div class="toast-container position-fixed top-0 end-0 p-3">
  <div class="toast {{#if success}}success{{else}}error{{/if}}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="3000">
    <div class="toast-header">
      {{#if success}}
      <i class="ri-checkbox-circle-fill me-2"></i>
      {{else}}
      <i class="ri-error-warning-fill me-2"></i>
      {{/if}}
      <strong class="me-auto">{{title}}</strong>
      <button type="button" class="btn" data-bs-dismiss="toast" aria-label="Close"><i class="ri-close-line"></i></button>
    </div>
    <div class="toast-body">
      {{message}}
    </div>
  </div>
</div>
`
const toastTemplateFunction = Handlebars.compile(toastTemplate);