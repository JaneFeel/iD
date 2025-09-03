import { dispatch as d3_dispatch } from 'd3-dispatch';
import { presetField } from '../presets/field';
import { t } from '../core/localizer';
import { svgIcon } from '../svg';
import { uiField } from './field';
import { uiFormFields } from './form_fields';
import { utilRebind } from '../util';

export function uiExportForm(context) {
    var dispatch = d3_dispatch('cancel');
    var formFields = uiFormFields(context);
    var _fieldsArr;
    var _tags = {};
    
    function createFields() {
        var fields = {
            'export_image_type': {
                key: 'image_type',
                type: 'radio',
                label: 'Image Options',
                options: ['original', 'tiles'],
                strings: {
                    options: {
                        original: 'Original Image',
                        tiles: 'Image Tiles'
                    }
                }
            },
            'export_format_type': {
                key: 'format_type',
                type: 'radio',
                label: 'Format Options',
                options: ['coco', 'yolo'],
                strings: {
                    options: {
                        coco: 'COCO',
                        yolo: 'YOLO'
                    }
                }
            },
            // 'export_include_metadata': {
            //     key: 'include_metadata',
            //     type: 'check',
            //     label: 'Include Metadata'
            // }
        };
        
        return [
            uiField(context, presetField(t('export.image_options'), fields.export_image_type), null, { show: true, revert: false }),
            uiField(context, presetField(t('export.format_options'), fields.export_format_type), null, { show: true, revert: false }),
            // uiField(context, presetField('export_include_metadata', fields.export_include_metadata), null, { show: true, revert: false })
        ];
    }

    function exportForm(selection) {
        render(selection);
    }

    function render(selection) {
        var initial = false;
        
        if (!_fieldsArr) {
            initial = true;
            _fieldsArr = createFields();
            
            _fieldsArr.forEach(function(field) {
                field
                    .on('change', function(t, onInput) {
                        _tags = Object.assign({}, _tags, t);
                    });
            });
        }
        
        _fieldsArr.forEach(function(field) {
            field.tags(_tags);
        });
        
        selection.selectAll('.export-form').remove();
        
        var formHeader = selection
            .append('div')
            .attr('class', 'header fillL');
            
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
        
        var formContent = selection
            .append('div')
            .attr('class', 'modal-section');
        
        formContent
            .call(formFields.fieldsArr(_fieldsArr));
        
        var actionSection = selection
            .append('div')
            .attr('class', 'modal-section save-section fillL');

        var buttonsSection = actionSection
            .append('div')
            .attr('class', 'buttons fillL')
            
        buttonsSection
            .append('button')
            .attr('class', 'action button')
            .text(t('export.export_button'))
            .on('click', function() {
                var exportOptions = {
                    imageType: _tags.image_type || 'original',
                    formatType: _tags.format_type || 'coco',
                    includeMetadata: _tags.include_metadata !== undefined ? _tags.include_metadata : true
                };
                
                console.log('Export options:', exportOptions);                
                dispatch.call('cancel');
            });
            
        if (initial) {
            _tags = {
                image_type: 'original',
                format_type: 'coco',
                include_metadata: true
            };
            
            _fieldsArr.forEach(function(field) {
                field.tags(_tags);
            });
        }
    }

    exportForm.on = function(type, callback) {
        dispatch.on(type, callback);
        return exportForm;
    };

    return utilRebind(exportForm, dispatch, 'on');
}