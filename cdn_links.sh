find . -type f \( -name "*.js" -o -name "*.css" \) | while read file; do
  echo "https://cdn.jsdelivr.net/gh/ramiisaac/raisaac@main/${file#./}"
done
