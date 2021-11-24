ne pas oublier le npm install


pour le déploiment : 
docker build .
heroku login
heroku container:login
heroku create
heroku container:push -a PASTE_YOUR_APP_NAME web
heroku container:release -a PASTE_YOUR_APP_NAME web
heroku open -a PASTE_YOUR_APP_NAME


lien vers les sites:
exo1 et 2 : https://murmuring-crag-28900.herokuapp.com/
exo3 : https://hidden-peak-35637.herokuapp.com/
exo4 : https://agile-bastion-14008.herokuapp.com/