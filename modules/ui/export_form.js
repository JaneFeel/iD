import { dispatch as d3_dispatch } from 'd3-dispatch';
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
        var imageTypeField = {
            id: 'image_type',
            key: 'image_type',
            type: 'radio',
            label: function() { return t.append('export.image_options'); },
            placeholder: function() { return ''; },
            options: ['original', 'tiles'],
            t: function(scope, options) {
                if (scope === 'options.original') return t('export.original_image', options);
                if (scope === 'options.tiles') return t('export.image_tiles', options);
                return t('export.' + scope, options);
            }
        };
        
        var formatTypeField = {
            id: 'format_type',
            key: 'format_type',
            type: 'radio',
            label: function() { return t.append('export.format_options'); },
            placeholder: function() { return ''; },
            options: ['coco', 'yolo'],
            t: function(scope, options) {
                if (scope === 'options.coco') return 'COCO';
                if (scope === 'options.yolo') return 'YOLO';
                return t('export.' + scope, options);
            }
        };
        
        var metadataField = {
            id: 'include_metadata',
            key: 'include_metadata',
            type: 'check',
            label: function() { return t.append('export.include_metadata'); },
            placeholder: function() { return ''; },
            t: function(scope, options) {
                return t('export.' + scope, options);
            }
        };
        
        return [
            uiField(context, imageTypeField, null, { show: true, revert: false }),
            uiField(context, formatTypeField, null, { show: true, revert: false }),
            uiField(context, metadataField, null, { show: true, revert: false })
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
            .attr('class', 'export-form section-content');
        
        formContent
            .call(formFields.fieldsArr(_fieldsArr));
        
        var actionSection = selection
            .append('div')
            .attr('class', 'export-form section-buttons');
            
        actionSection
            .append('button')
            .attr('class', 'export-button action')
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