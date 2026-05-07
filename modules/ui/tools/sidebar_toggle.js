import { t, localizer } from '../../core/localizer';
import { svgIcon } from '../../svg';
import { uiTooltip } from '../tooltip';

export function uiToolSidebarToggle(context) {
    var _labelSelection;

    function updateLabel() {
        if (!_labelSelection) return;
        var isCollapsed = context.container().select('.sidebar').classed('collapsed');
        _labelSelection.text(t(`icons.${isCollapsed ? 'expand' : 'collapse'}`));
    }

    var tool = {
        id: 'sidebar_toggle',
        label: function(selection) {
            _labelSelection = selection;
            updateLabel();
        }
    };

    tool.render = function(selection) {
        selection
            .append('button')
            .attr('class', 'bar-button')
            .attr('aria-label', t('sidebar.tooltip'))
            .on('click', function() {
                context.ui().sidebar.toggle();
                window.setTimeout(updateLabel, 0);
                window.setTimeout(updateLabel, 300);
            })
            .call(uiTooltip()
                .placement('bottom')
                .title(() => t.append('sidebar.tooltip'))
                .keys([t('sidebar.key')])
                .scrollContainer(context.container().select('.top-toolbar'))
            )
            .call(svgIcon('#iD-icon-sidebar-' + (localizer.textDirection() === 'rtl' ? 'right' : 'left')));
    };

    return tool;
}
