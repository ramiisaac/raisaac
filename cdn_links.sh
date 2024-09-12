find . -type f \( -name "*.js" -o -name "*.css" \) | while read file; do
  filename=$(basename "$file")  # Get the file name
  if [[ "$file" == *.js ]]; then
    # Generate <script> tag for JavaScript files
    echo "<script id=\"${filename%.js}-script\" src=\"https://cdn.jsdelivr.net/gh/ramiisaac/raisaac@main/${file#./}\"></script>"
  elif [[ "$file" == *.css ]]; then
    # Generate <link> tag for CSS files
    echo "<link id=\"${filename%.css}-style\" rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/gh/ramiisaac/raisaac@main@main/${file#./}\">"
  fi
done
