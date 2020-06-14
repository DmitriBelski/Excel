git init // иницилизируем пустой git репозиторий в нашей папке
git add . // добавляем все файлы в будущий комит
git commit -m "initial" // коммитим с сообщением "initial"














…or create a new repository on the command line
echo "# Excel" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/DmitriBelski/Excel.git
git push -u origin master

…or push an existing repository from the command line
git remote add origin https://github.com/DmitriBelski/Excel.git
git push -u origin master