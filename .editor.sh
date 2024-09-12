#!/bin/bash

# Define filenames to ignore (scripts you don't want to double index)
IGNORE_FILES=("head-scripts.js" "body-scripts.js" "external-scripts.js")

# Function to check if the file is ignored
is_ignored() {
  for ignore in "${IGNORE_FILES[@]}"; do
    if [[ "$1" == *"$ignore" ]]; then
      return 0
    fi
  done
  return 1
}

# Generate external-scripts.js (for external libraries)
echo "/* External libraries script */" > external-scripts.js
echo "<script src=\"https://cdn.jsdelivr.net/npm/gsap@3.9.1/dist/gsap.min.js\" onload=\"window.GSAP = gsap;\"></script>" >> external-scripts.js
echo "<script src=\"https://cdn.jsdelivr.net/npm/gsap@3.9.1/dist/ScrollTrigger.min.js\" onload=\"window.ScrollTrigger = ScrollTrigger;\"></script>" >> external-scripts.js
echo "<script src=\"https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.3/dist/locomotive-scroll.min.js\" onload=\"window.LocomotiveScroll = LocomotiveScroll;\"></script>" >> external-scripts.js

# Generate head-scripts.js (for CSS files)
echo "/* Head styles generated on $(date) */" > head-scripts.js
find . -type f -name "*.css" | while read file; do
  if ! is_ignored "$file"; then
    filename=$(basename "$file")
    echo "<link id=\"${filename%.css}-style\" rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/ramiisaac/raisaac@main/${file#./}\">" >> head-scripts.js
  fi
done

# Generate body-scripts.js (for JS files)
echo "/* Body scripts generated on $(date) */" > body-scripts.js
find . -type f -name "*.js" | while read file; do
  if ! is_ignored "$file"; then
    filename=$(basename "$file")
    echo "<script id=\"${filename%.js}-script\" src=\"https://cdn.jsdelivr.net/gh/ramiisaac/raisaac@main/${file#./}\"></script>" >> body-scripts.js
  fi
done

# Display content for copy-pasting (starting with external libraries)
echo ""
echo "/* External Libraries (Place in head or body as needed) */"
cat external-scripts.js
echo ""
echo "/* Generated Head CSS Links */"
cat head-scripts.js
echo ""
echo "/* Generated Body JS Links */"
cat body-scripts.js
