const { NlpManager } = require("node-nlp");
const nlp = require("node-nlp/src/nlp");
const nlpJSON = require("./nlp");

class NLP {
  constructor(id, lang = "en") {
    this.id = id;
    this.lang = "en";
    this.manager = new NlpManager({ languages: ["en"] });
    this.isTrained = false;
    this._trainModel();
  }

  addPhrase(phrase, intent) {
    this.manager.addDocument("en", phrase, intent);
  }

  async getIntent(text, context) {
    if (!this.isTrained) await this._trainModel();

    const res = await this.manager.process("en", text);
    const { classifications, ...rest } = res;
    return rest;
  }

  async _trainModel() {
    if (this.isTrained) {
      return;
    }

    for (let theIntent of nlpJSON) {
      const { sentence, intent, answer } = theIntent;
      this.manager.addDocument(this.lang, sentence, intent);
      if (answer !== undefined) {
        this.manager.addAnswer("en", intent, answer);
      }
    }

    await this.manager.train();
    this.manager.save();
    this.isTrained = true;
  }
}

module.exports = NLP;
