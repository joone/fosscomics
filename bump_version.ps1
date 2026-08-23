param(
  [ValidateSet("patch", "minor", "major")]
  [string]$Level = "patch"
)

npm version $Level -m "Bump version to %s"
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

$tag = "v$(node -p "require('./package.json').version")"

$answer = Read-Host "Would you like to push the tag? (y or n)"
if ($answer -eq "y") {
  git push origin "refs/tags/$tag"
}