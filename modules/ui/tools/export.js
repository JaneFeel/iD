import { t } from '../../core/localizer';
import { svgIcon } from '../../svg';
import { uiTooltip } from '../tooltip';

export function uiToolExport(context) {

    var tool = {
        id: 'export',
        label: t.append('export.title')
    };

    var button = null;
    var tooltipBehavior = null;

    function showExportForm() {
        var modalContent = context.container().select('.content');
        
        modalContent.selectAll('.export-form').remove();
        
        var exportForm = modalContent
            .append('div')
            .attr('class', 'modal export-form')
            .style('display', 'block');
            
        var formHeader = exportForm
            .append('div')
            .attr('class', 'modal-section header');
            
        formHeader
            .append('h3')
            .text(t.append('export.title'));
            
        formHeader
            .append('button')
            .attr('class', 'close')
            .on('click', function() {
                exportForm.remove();
            })
            .call(svgIcon('#iD-icon-close'));
            
        var formContent = exportForm
            .append('div')
            .attr('class', 'modal-section export-options');
            
        var imageSection = formContent
            .append('div')
            .attr('class', 'export-section');
            
        imageSection
            .append('h4')
            .text(t.append('export.image_options'));
            
        var imageOptions = imageSection
            .append('div')
            .attr('class', 'export-options-group');
            
        var imageTypeRadio = imageOptions
            .append('div')
            .attr('class', 'radio-group');
            
        imageTypeRadio
            .append('label')
            .attr('class', 'radio-label')
            .text(t.append('export.original_image'))
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'image-type')
            .attr('value', 'original')
            .attr('checked', 'checked');
            
        imageTypeRadio
            .append('label')
            .attr('class', 'radio-label')
            .text(t.append('export.image_tiles'))
            .append('input')
            .attr('type', 'radio')
            .attr('name', 'image-type')
            .attr('value', 'tiles');
            
        var formatSection = formContent
            .append('div')
            .attr('class', 'export-section');
            
        formatSection
            .append('h4')
            .text(t.append('export.format_options'));
            
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
            .text(t.append('export.include_metadata'))
            .append('input')
            .attr('type', 'checkbox')
            .attr('name', 'include-metadata')
            .attr('checked', 'checked');
            
        var actionSection = exportForm
            .append('div')
            .attr('class', 'modal-section export-actions');
            
        actionSection
            .append('button')
            .attr('class', 'export-button')
            .text(t.append('export.export_button'))
            .on('click', function() {
                var imageType = modalContent.select('input[name="image-type"]:checked').property('value');
                var formatType = modalContent.select('input[name="format-type"]:checked').property('value');
                var includeMetadata = modalContent.select('input[name="include-metadata"]').property('checked');
                exportForm.remove();
            });
    }

    tool.render = function(selection) {
        tooltipBehavior = uiTooltip()
            .placement('bottom')
            .title(() => t.append('export.tooltip'))
            .scrollContainer(context.container().select('.top-toolbar'));

        button = selection
            .append('button')
            .attr('class', 'export bar-button')
            .on('pointerup', function(d3_event) {
                lastPointerUpType = d3_event.pointerType;
            })
            .on('click', function() {
                showExportForm();
            })
            .call(tooltipBehavior);

        button
            .call(svgIcon('#iD-icon-export'));
    };

    tool.uninstall = function() {
        button = null;
        tooltipBehavior = null;
    };

    return tool;
}