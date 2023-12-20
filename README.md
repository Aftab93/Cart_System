# Cart System

#### Launch SASS Watcher

```bash
cwd=`pwd`

MY_STYLES_DIR="${cwd}/assets/styles"
if [ ! -d "$MY_STYLES_DIR" ]; then
  mkdir -p "$MY_STYLES_DIR"
fi

sass sass:assets/styles --watch
```