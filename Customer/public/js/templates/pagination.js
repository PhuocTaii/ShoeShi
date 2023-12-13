const paginationTemplate = 
`
	{{#if totalPages}}
	<li class="page-item {{disabledPage 1 activePage}}">
		<a class="page-link" aria-label="Previous" onclick="paging({{add activePage -1}})">
			<span aria-hidden="true">&laquo;</span>
		</a>
	</li>

	{{#loopTill totalPages}}
		<li class="page-item {{activeCurrentPage index activePage}}"><a class="page-link" onclick=paging({{index}})>{{index}}</a></li>
	{{/loopTill}}

	<li class="page-item {{disabledPage totalPages activePage}}">
		<a class="page-link" aria-label="Next" onclick="paging({{add activePage 1}})">
			<span aria-hidden="true">&raquo;</span>
		</a>
	</li>
	{{/if}}
`

const paginationTemplateFunction = Handlebars.compile(paginationTemplate);