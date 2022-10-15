const Pokemon = require("../models/Pokemon");

class pokemonController {
  static myPokemonList = async (req, res) => {
    const pokemon = await Pokemon.find();
    res.send(pokemon);
  };

  static realeseMyPokemon = async (req, res) => {
    try {
      const { id } = req.params;
      await Pokemon.findByIdAndDelete(id);
      return res.status(200).json({
        message: "deleteSuccess",
      });
    } catch (error) {
      console.log(error);
    }
  };
  static addToMyPokemon = async (req, res) => {
    try {
      const { name, nickname, image } = req.body;
        const nameCheck = await Pokemon.findOne({ name });
        if (nameCheck) {
          return res.json({
            message: "pokemon already exist",
          });
        }
      const data = await Pokemon.create({
        name,
        nickname: nickname + "-0",
        image,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static generatePrimeNumber = async (req, res) => {
    let num = Math.floor(Math.random() * 100);
    let isPrimeNumber = true;
    if (num === 0 || num === 1) {
      isPrimeNumber = false;
    }
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        isPrimeNumber = false;
        break;
      }
    }
    console.log(num);
    res.send({
      number: num,
      isPrimeNumber: isPrimeNumber,
    });
  };

  static rename = async (req, res) => {
    try {
      const oldName = req.body.oldName;
      //   console.log(oldName);
      const currentData = await Pokemon.findOne({ nickname: oldName });
      //   console.log(currentData);
      if (!currentData) {
        res.send({
          message: "failed",
        });
      }
      let isCheck = currentData.isChecked;
      //   console.log(isCheck);
      const tempName = oldName.split("-");
      const oldFiboNum = parseInt(tempName[1]);

      let newFiboNum = 0;
      let a = 0;
      let c = 0;
      let b = 1;
      if (oldFiboNum == 1 && isCheck === false) {
        // console.log("aww");
        newFiboNum = 1;
        isCheck = true;
      } else if (oldFiboNum >= newFiboNum) {
        // console.log("else");
        while (newFiboNum <= oldFiboNum) {
          c = a;
          a = b;
          b = a + c;
          newFiboNum = b;
        }
      }
      const newName = tempName[0] + "-" + newFiboNum;
      console.log(newName, isCheck);
      const updatedName = await Pokemon.updateOne(
        {
          nickname: oldName,
        },
        {
          nickname: newName,
          isChecked: isCheck,
        }
      );
      res.send(updatedName);
    } catch (error) {}
  };
}

module.exports = pokemonController;
