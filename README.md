# Sykkeloversikt

## Oppsett

Installer avhengigheter med `npm install`.

For at Oslo bysykkel sitt API skal fungere trenger du en klientnøkkel. Du kan generere dette
[her](https://developer.oslobysykkel.no). Deretter må du eksponere klientnøkkelen som en
miljøvariabel som heter `CLIENT_IDENTIFIER`. Dersom du bruker bash/zsh kan du gjøre dette med
`export CLIENT_IDENTIFIER=xxxxxxx`. Dersom du bruker fish kan du bruke
`set -gx CLIENT_IDENTIFIER "xxxxxxx"`.

For å kjøre prosjektet:

1. Bygg front-enden: `npm run build` (du kan også bruke `npm run watch` om du vil bygget skal oppdatere
seg ved kodeendringer).
2. Kjør serveren: `npm run start`.
3. Går til http://localhost:1234

## Lisens

MPL-2.0
