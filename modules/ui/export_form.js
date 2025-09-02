import { dispatch as d3_dispatch } from 'd3-dispatch';
import { select as d3_select } from 'd3-selection';

import { t } from '../core/localizer';
import { svgIcon } from '../svg';

export function uiExportForm(context) {
    var dispatch = d3_dispatch('cancel');
    var _selection;

    function exportForm(selection) {
        _selection = selection;
        selection.call(render);
    }

    function render(selection) {
        var content = selection;
        
        content.selectAll('.export-form').remove();
        
        var formHeader = content
            .append('div')
            .attr('class', 'export-form section-header');
            
        formHeader
            .append('h3')
            .text(t('export.title'));
            
        formHeader
            .append('button')
            .attr('class', 'close')
            .on('click', function() {
                dispatch.call('cancel');
            })
            .call(svgIcon('#iD-icon-close'));
            
        var formContent = content
            .append('div')
            .attr('class', 'export-form section-content');
            
        var imageSection = formContent
            .append('div')
            .attr('class', 'export-section');
            
        imageSection
            .append('h4')
            .text(t('export.image_options'));
            
        var imageOptions = imageSection
            .append('div')
            .attr('class', 'export-options-group');
            
        var imageTypeRadio = imageOptions
            .append('div')
            .attr('class', 'radio-group');
            
        imageTypeRadio
            .append('label')
            .attr('class', 'radio-label')
            .text(t('export.original_image'))
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'image-type')
            .attr('value', 'original')
            .attr('checked', 'checked');
            
        imageTypeRadio
            .append('label')
            .attr('class', 'radio-label')
            .text(t('export.image_tiles'))
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'image-type')
            .attr('value', 'tiles');
            
        var formatSection = formContent
            .append('div')
            .attr('class', 'export-section');
            
        formatSection
            .append('h4')
            .append('h4')
            .text(t('export.format_options'));
            
        var formatOptions = formatSection
            .append('div')
            .attr('class', 'export-options-group');
            
        var formatTypeRadio = formatOptions
            .append('div')
            .attr('class', 'radio-group');
            
        formatTypeRadio
            .append('label')
            .attr('class', 'radio-label')
            .text('COCO')
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'format-type')
            .attr('value', 'coco')
            .attr('checked', 'checked');
            
        formatTypeRadio
            .append('label')
            .attr('class', 'radio-label')
            .text('YOLO')
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'format-type')
            .attr('value', 'yolo');
            
        var metadataSection = formContent
            .append('div')
            .attr('class', 'export-section');
            
        var metadataCheckbox = metadataSection
            .append('div')
            .attr('class', 'checkbox-group');
            
        metadataCheckbox
            .append('label')
            .attr('class', 'checkbox-label')
            .text(t('export.include_metadata'))
            .append('input')
            .attr('type', 'checkbox')
            .attr('name', 'include-metadata')
            .attr('checked', 'checked');
            
        var actionSection = content
            .append('div')
            .attr('class', 'export-form section-buttons');
            
        actionSection
            .append('button')
            .attr('class', 'export-button action')
            .text(t('export.export_button'))
            .on('click', function() {
                var imageType = content.select('input[name="image-type"]:checked').property('value');
                var formatType = content.select('input[name="format-type"]:checked').property('value');
                var includeMetadata = content.select('input[name="include-metadata"]').property('checked');
                dispatch.call('cancel');
            });
    }

    exportForm.on = function(type, callback) {
        dispatch.on(type, callback);
        return exportForm;
    };

    return exportForm;
}