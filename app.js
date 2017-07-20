var myBoxMailApp = angular.module('webmail', ["ngSanitize"]);

myBoxMailApp.controller('webmailCtrl', function ($scope, $location, $filter) {
  // location permet de gérer l'url coté client => précedent après refresh =>connaître en temps réel le path
  $scope.dossiers=[
    {value: "RECEPTION", label: "Boite de réception", emails:[
      {id:1, from:'Fleurette', to:"Jean",subject:"Je reviens",date: new Date(2017,03,22, 15,30), content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"},
      {id:2, from:'Valérie', to:"Jean",subject:"Retard",date:new Date(2017,03,23,08,24), content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"},
      {id:3, from:'Feno', to:"Jean",subject:"long bail",date:new Date(2017,03,25,17,45), content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"},
      {id:4, from:'Hery', to:"Jean",subject:"elaela!",date:new Date(2017,04,27,06,15), content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"}

    ]},


    {value: "ARCHIVES", label: "Archives", emails:[
      {id:5, from:'Candy', to:"Jean",subject:"Joyeux anniv",date:new Date(2011,2,20,13,10), content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"},
      {id:6, from:'Tsiory', to:"Jean",subject:"Félicitations",date:new Date(2012,1,2,09,55), content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"},
      {id:7, from:'Marc', to:"Jean",subject:"Maladie",date:new Date(2013,5,28,9,13), content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"}
    ]},

  {value: "ENVOYES", label: "Envoyés", emails:[
    {id:8, from:'Jean', to:"Fleurette",subject:"Joyeux Noêl?",date:new Date(2011,12,25,9,00), content:
     "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"},
    {id:9, from:'Jean', to:"Valérie",subject:"RV dimanche",date:new Date(2012,2,24,15,45), content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"}

  ]},

  {value: "SPAM", label: "Couriers indésirables", emails:[
    {id:10, from:'Rue du discount', to:"Jean",subject:"ordi pas cher",date:new Date(2017,6,17,6,12), content:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te"},

    {id:11, from:'voyanteIsabella', to:"Jean",subject:"Important gains",date:new Date(2017,6,18,11,44), content:
     "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod te <a>test ngSanitize</a>"}

  ]}

];

// DEBUT HISTORIQUE DE NAVIGATION

// une fonction qui va indiquer dans le modèle que notre dossier aété selectionné
$scope.dossierCourant = null;
$scope.emailSelectionne = null;
$scope.idProchainMail = 12;
$scope.newMail = {};

$scope.versEmail = function (dossier, email) {
  $location.path("/" + dossier.value +"/" + email.id);
}

$scope.selectionDossier =function (dossier) {
  $scope.dossierCourant = dossier;
  // pour pouvoir revenir à la boite de reception ou autre menu
  $scope.emailSelectionne = null;
  // effacer la variable nouveauMail uniquement si dossier n'est pas null
  if (dossier) {
    $scope.newMail = null ;
    }
}

$scope.selectionMail =function (email) {
  $scope.emailSelectionne = email;
};


// tri
$scope.champTri ="";

$scope.triParExpediteur = function () {
  $scope.champTri ="from";
}

$scope.triParDestinataire = function () {
  $scope.champTri ="to";
}

// RECHERCHE
$scope.recherche = ""; // au lieu de $scope.recherche = null;
$scope.effacerRecherche = function () {
$scope.recherche = ""; // au lieu de $scope.recherche = null;
}

// CREATION EMAIL

$scope.effacerMail = function () {
  // permet d'effacer le mail et initialiser les éléments dans nouveau Mail
  $scope.newMail = {
    from : "Jean",
    date : new Date()
  };
}

// ENVOIE Mail

$scope.envoieMail = function () {
  $scope.dossiers.forEach(function (item) {
    if (item.value == "ENVOYES") {
      $scope.newMail.id = $scope.idProchainMail++;
      item.emails.push($scope.newMail);

      // une fois enregistré, on écrase newMail
      $scope.newMail= null;
      // et revenir à l'accueil ou path par défaut
      $location.path("/");
    }
  })
}


// pour surveiller ce qui ce passe dans l'url. Attention: la fonction watch prend un dollars
$scope.$watch(function () {
  // retourner la valeur à surveiller
  return $location.path();
},function(newPath) {
  var tabPath = newPath.split("/");

  if (tabPath.length > 1) {

      // en lien création mail
      if (tabPath[1] == "nouveauMail") {
        $scope.effacerMail();
        // pour deslecectionner les autres elements
      } else {
        var valDossier = tabPath[1];
        $scope.dossiers.forEach(function(item) {
          if (item.value == valDossier) {
            $scope.selectionDossier(item);
          }
        });

        if (tabPath.length > 2 ) {
          var idMail = tabPath[2];
          $scope.dossierCourant.emails.forEach(function(item) {
          if (item.id == idMail) {
            $scope.selectionMail(item);
            }
        });
      }
    }

  }

});
// FIN HISTORIQUE DE NAVIGATION



});

// PERSONALISER filter (n oublie pas le point avant filter)
// .filter("surbrillanceRecherche", function () {
//   return function (input, recherche) {
//     if(recherche){
//       return input.replace( new RegExp("(" + recherche + ")","gi"), "<span class="surbrillanceRecherche">$1</span>");
//     }
//     return input;
//   }
// });
