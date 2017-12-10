App = Ember.Application.create();

//all routers
App.Router.map(function() {
  this.route("about");
  this.route("collections");
  this.route("notes");
});



// Collections Route
App.CollectionsRoute = Ember.Route.extend({
  model: function() {
    return [
      {
        title: "Painting Collection",
        intro: "The Palace Museum’s collection of paintings includes approximately 50,000 works from throughout the dynastic history of China. Almost a thousand of these works are considered first-grade national relics. The collection is comprised of famous works by renowned artist",
        image: "images/c1.png"
      },
      {
        title: "Featured Painting: Scroll Painting of Deer Whistle Hunting Scene ",
        intro: "This painting shows groups of deer and a hunting party within the mountains. The third rider from the left is the Qianlong Emperor. Atop his white horse, he has a valiant and dignified bearing. In this painting, he is thirty years old, and it was his first hunt at the Mulan Paddock since taking the throne; thus it was a highly significant hunting trip for him. These annual hunting trips were a means of training the troops, organizing the imperial arsenal, appeasing the Mongolians, and solidifying the Qing government's control of the border. The piece was painted by Guiseppe Castiglione in the sixth year of the Qianlong Emperor's reign (1741).",
        image:"images/e1.jpg",
      },
      {
        title: "Sculpture Collections",
        intro: "The sculpture collection at the Palace Museum includes figurines (primarily pottery figurines from the Han, Sui, and Tang dynasties); white marble Buddhist statues from Quyang, Hebei Province ; wooden Arhat (luohan) statues (fifty works from the Nanhua Temple in Shaoguan, Guangdong Province, dated to the Northern Song);  and decorative sculpted bricks and stones from the Han dynasty. The sculpted articles in the Palace Museum collection are unique and represent a diverse range of content. The historical and artist value of these works is known throughout China and around the world.",
        image: "images/c2.png"
      },
      {
        title: "Featured Sculpture: Painted Pottery Figurine of a Female Dancer",
        intro: "The combination of dance and music was very popular in the Tang dynasty, and dances from Central and West Asia and ethnic minority groups in northwestern China were adopted as a fashionable form of entertainment and were frequently presented during festivals. Aristocrats would also bring musicians with them on excursions. Consequently, these types of dance accompanied by music featured prominently in the period's daily life.",
        image: "images/e3.jpg"
      },

      {
        title: "Calligraphy Collections",
        intro: "The Palace Museum’s collection of calligraphic works is an expansion of the Ming and Qing imperial holdings. These works include various forms of correspondence by eminent individuals, works of poetry, religious texts, and manuscripts from China’s dynastic history.",
        image: "images/c3.png"
      },

      {
        title: "Featured Caligraphy ",
        intro: "For the SteleInscription in Memory of Imperial Preceptor Dampa in Regular Script. Caligrapher: Zhao Mengfu(1254-1322)",
        image:"images/e2.jpg"
      },

      {
        title: "Textiles",
        intro: "The Palace Museum’s holdings of textiles includes over 130,000 works, including clothing and accessories, fabric, decorative embroidery, and embroidered paintings and calligraphy. Most of the works in the collection were articles used in the Qing palace. ",
        image: "images/e4.jpg"
      },
      {
        title: "Featured textile",
        intro:"With a band collar and large sleeves, this sleeved-cape opens at the front and on both sides. Designs of clouds, bats, and flowers cover the garment. The more readily-seen parts of the garment feature deer with butterflies, bats, flowers, and the Eight-Treasures. The bottom features ocean waves and precipitous rocks. All of the imagery combines to symbolize good fortune, abundance, and longevity.",
        image: "images/c4.jpg"
      }

    ];
  }
});

// Customize the Collections component
App.SingleCollectionComponent = Ember.Component.extend({
  tagName: "article",
  classNames: ["article identation"]
});



//Post delete edit and save note
 App.Note = DS.Model.extend({
  copy: DS.attr()
});

App.NotesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("note");
  }
});

App.NotesController = Ember.ArrayController.extend({
  actions: {
    newNote: function() {
      var copy = this.get("newNote");
      if (!copy) {
        return false;
      }

      var note = this.store.createRecord("note", {
        copy: copy
      });

      this.set("newNote", "");
      note.save();
    }
  }
});

App.NoteController = Ember.ObjectController.extend({
  edit: false,
  actions: {
    editComment: function() {
      this.set("edit", true);
    },
    saveComment: function() {
      this.set("edit", false);

      if (!(this.get("model.copy"))) {
        this.send("deleteComment");
      } else {
        this.get("model").save();
      }
    },
     deleteComment: function() {
      this.get("model").deleteRecord();
      this.get("model").save();
    }
  }
});

App.EditNote = Ember.TextArea.extend({
  attributeBindings: ["cols", "rows"],
  cols: 40,
  rows: 20
});

Ember.Handlebars.helper("update-note", App.EditNote);

App.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: "comment"
});
