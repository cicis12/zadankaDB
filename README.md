# ZadankaDB

Prosty kod z chataGPT zeby przechowywać zadanka, grupe, kod, pdfa itd w bazie danych w AIRTABLE

> "potęzna rzecz"

---

## Spis Treści

- [SetupAirblada](#SetupAirblada)
- [SetupClienta](#SetupClienta)
- [Uzytkowanie](#Uzytkowanie)

---

## SetupAirblada

work in progress

---

## SetupClienta

1. **Sklonuj projekt / przekopiuj pliki**
```bash
git clone https://github.com/cicis12/zadankaDB
```
2. **Zainstaluj node.js (jeśli nie masz)**

robisz to jakkolwiek ci wygodnie, sam se znajdz

3. **Zainstaluj dependencies**

<del>
daj uprawnienia dla skryptu
```bash
chmod +x checkDependencies.sh
```
potem go odpal
```bash
./checkDependencies.sh
```
</del>
Jeśli nie dziala to manualnie zainstaluj:
```bash
npm install axios form-data airtable
```

4. **Wstaw odpowiednie wartości w pliku sync.js**

Odpal plik sync.js (uwaga javascript, bedzie jumscare)
Zamień wartości na poczatku

5. **Powinno dzialac lol**

## Uzytkowanie

**Opcja 1. odpalasz komendą**
<> - obowiązkowe
[] - opcjonalne
```bash
node /<sciezka_do_pliku>/sync.js <name> <pdfFilePath> <cppFilePath> [Grupa] [LiczbaPunktow] [PoziomTrudności]
```

**Opcja 2. odpalasz skryptem**

work in progress
