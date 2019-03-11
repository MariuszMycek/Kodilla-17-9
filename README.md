Zadanie wykonałem razem z poleceniami "dla chętnych":
- pliki zapisują się na serwerze pod oryginalną nazwą,
- dodałem templatkę po uploadzie,
- dodałem, jakieś tam style, żeby nie wyglądało to topornie.

Wydaje mi się że znów znalazłem błędy w zadaniu leżące po stronie autora.

Użyta przez autora metoda fs.renameSync() wywala mi błąd o następującej treści:
Error: EXDEV: cross-device link not permitted

Nie rozumiem za bardzo co sygnalizuje mi ten błąd, ale znalazłem rozwiązanie.
Zastąpiłem moduł fs, modułem fs-extra, który to jest jego rozszerzeniem i posiada 
metody zastępcze, działające poprawnie w sytuacjach, gdy fs wywala błędy.
Zgodnie ze znalezionym rozwiązaniem, zastąpiłem metodę fs.remaneSync(), metodą
fs.moveSync() i wszystko śmiga jak należy.

Jako, że w zadaniu autor użył: input type="file" z nadaną własnością multiple, eksperymentowałem 
z wysyłaniem wielu plików na raz. I jak się okazało, zastosowany przez autora moduł formidable
nie radzi sobie z wieloma plikami. Files, które jest generowane przez parse() ma w sobie tylko info o jednym pliku
i nie można odczytać wartości dla pozostałych plików. 
Zastępczo użyłem modułu multiparty, który obsługuje wysyłanie wielu plików i tworzy
info o wszystkich uploadowanych plikach, dzięki czemu opcja multiple działała mi poprawnie.

Niestety nie wymiśliłem rozwiązania jak zwrócić templatkę ze wszystkimi uploadowanymi
plikami. Oczywiście mógłbym to zrobić za pomocą response.write(file, "binary"), które by się wywołało 
tyle razy, ile jest plików, ale to rozwiązanie wydawało mi się toporne i go porzuciłem.

Co za tym idzie, ostateczna wersja zadania jest zrobiona wg wytycznych, bez dodatków ode mnie.

