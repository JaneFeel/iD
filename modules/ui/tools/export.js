import { t } from '../../core/localizer';
import { svgIcon } from '../../svg';
import { uiTooltip } from '../tooltip';
import { uiExportForm } from '../export_form';

export function uiToolExport(context) {

    var tool = {
        id: 'export',
        label: t.append('export.title')
    };

    var button = null;
    var tooltipBehavior = null;
    var exportForm = uiExportForm(context)
        .on('cancel', function() {
            context.ui().sidebar.hide();
        });

    function showExportForm() {
        context.ui().sidebar.expand();
        context.ui().sidebar.show(exportForm);
    }

    tool.render = function(selection) {
        tooltipBehavior = uiTooltip()
            .placement('bottom')
            .title(() => t.append('export.tooltip'))
            .scrollContainer(context.container().select('.top-toolbar'));
            
        var lastPointerUpType;
    
        button = selection
            .append('button')
            .attr('class', 'export bar-button')
            .on('pointerup', function(d3_event) {
                lastPointerUpType = d3_event.pointerType;
            })
            .on('click', function() {
                showExportForm();
                lastPointerUpType = null;
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