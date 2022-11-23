# UXP Invisible Plugin Sample

This plugin is an example of an invisible UXP plugin. An invisible plugin remains hidden during its whole life cycle -- meaning it does not have any UI or (persistent) menu options.

This plugin will surface an alert dialog. Note that the alert is shown when `entrypoints.plugin.create()` is called. This method is called only upon upon plugin installation so if you want to see the alert appear again, you'll have to uninstall and reinstall the plugin.
