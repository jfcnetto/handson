$files = Get-ChildItem -Path "c:\HandsOn\handson-app\src\app\(site)\" -Filter "page.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    if ($content -match '<img' -and $content -notmatch 'import Image') {
        if ($content -match 'import ') {
            $content = $content -replace '(?m)^(import.*)$', "import Image from 'next/image'`n`$1"
        } else {
            $content = "import Image from 'next/image'`n`n" + $content
        }
    }

    $content = [regex]::Replace($content, '<img\s+([^>]+?)\s*/?>', {
        param($match)
        $attrs = $match.Groups[1].Value
        if (-not $attrs.Contains('width=')) {
            $attrs += ' width={1200} height={800}'
        }
        return "<Image $attrs />"
    })

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated $($file.FullName)"
}
