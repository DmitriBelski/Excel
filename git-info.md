git init // иницилизируем пустой git репозиторий в нашей папке
git add . // добавляем все файлы в будущий комит
git commit -m "initial" // коммитим с сообщением "initial"
git remote add origin https://github.com/DmitriBelski/Excel.git // задаем адрес месту храниения репозитория  
git push -u origin master // заливаем код в репозиторий, в мастер ветку
git checkout -b "webpack" // переключаемся на отдельную ветку для работы с вебпаком, -b означает branch
git add .
git commit -m "create webpack config" // коммитим изменения (мы создали файл конфига), но не с мастер веткой, а с веткой webpack
git push -u origin webpack // заливаем код в репозиторий, в вэбпак ветку

<!-- мы закончили писать webpack config -->

git add .
git commit -m "finish project config"
git push -u origin webpack

<!-- смержили ветки на гите -->

git checkout master
git pull // мастер ветка поддтягивает новыые смерженные данные с серевера