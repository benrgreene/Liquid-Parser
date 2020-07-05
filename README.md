# Liquid Parser

This is a tool for analyzing the liquid files in a project to detect any potential performance issues (nested loops, inline scripts, etc).

Currently it only scans each liquid file individually, so any arguements are just for setting options.

## Running

Until the script is on NPM, it'll have to be run where the script is downloaded. If the tool is downloaded to `~/Downloads/LiquidParser/` for example, then you'll run the script like the following:

```
node ~/Downloads/LiquidParser/bin/liquify
```

Run the script in the base of a liquid project to analyze the entire project, or in a directory to analyze just the files in that directory.
