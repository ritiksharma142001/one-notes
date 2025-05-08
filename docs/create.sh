# create_folders.sh
folders=("MongoDB" "MySQL" "Postgres")
position=11

for folder in "${folders[@]}"; do
  mkdir -p "$folder"

  cat > "$folder/_category_.json" <<EOF
{
  "label": "$folder",
  "position": $position,
  "link": {
    "type": "generated-index",
    "description": "5 minutes to learn the most important Docusaurus concepts."
  }
}
EOF

  position=$((position + 1))
done
