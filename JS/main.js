var app = angular.module("characters", []);

app.controller('main', ['$scope', '$http', function ($scope, $http) {


    $scope.personagens = [];// Variável que irá receber os personagens da API
    $scope.personagemShow = {};//Variável que irá receber o personagem que o usuário deseja saber as informações
    $scope.urlBase = "https://api.got.show";//URL base para o link das imagens

    $http({//Requisição para a API
        method: 'GET',
        url: 'https://api.got.show/api/characters/'
    }).then(function successCallback(response) {
        $scope.personagens = response.data;
    }, function errorCallback(response) {
    });

    $scope.Show = function (personagem) {//Função acionada após o usuário clicar no card
        $scope.personagemShow = personagem;//Variável personagemShow recebe o personagem que o usuário deseja receber informações
        var modal = document.createElement('div');// Criação do Modal
        modal.id = "myModal";
        modal.innerHTML = `<div class="modal">
        <!-- Modal content -->
        <div class="modal-content">
            <span class="close" id="close">&times;</span>
            <img src= ${$scope.personagemShow.imageLink ? $scope.urlBase + $scope.personagemShow.imageLink : 'https://avatars.io/twitter/gameofthrones'}>
           <div class="information">
            <h1>Nome: ${$scope.personagemShow.name}</h1>
            <p>Gênero: ${$scope.personagemShow.male ? "Homem" : "Mulher"}
            <p>Casa: ${$scope.personagemShow.house}</p>
            <p>Titulos: ${$scope.personagemShow.titles}</p>
            </div>

          </div>
        
        </div>`
        document.querySelector('body').appendChild(modal);
        var body = document.querySelector('body');
        var child = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {// Função responsável por fechar o modal
            body.removeChild(child);
        }
    }
}])


