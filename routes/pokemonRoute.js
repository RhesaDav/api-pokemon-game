const pokemonController = require('../controllers/pokemon')
const routes = require('express').Router()

routes.get('/', pokemonController.myPokemonList)
routes.post('/', pokemonController.addToMyPokemon)
routes.delete('/:id', pokemonController.realeseMyPokemon)
routes.get('/generate-prime-number', pokemonController.generatePrimeNumber)
routes.patch('/rename', pokemonController.rename)

module.exports = routes