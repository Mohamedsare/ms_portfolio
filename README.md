# Portfolio Mohamed SARE

Un portfolio moderne et interactif développé avec Django, présentant les compétences et projets de Mohamed SARE.

## 🚀 Fonctionnalités

- **Design moderne et responsive** avec animations fluides
- **Mode sombre/clair** pour une expérience personnalisée
- **Loader animé** avec lettres qui rebondissent
- **Curseur personnalisé** avec effets interactifs
- **Navigation fluide** avec menu mobile responsive
- **Animations au scroll** pour une expérience engageante
- **Galerie de projets** avec filtres et lightbox
- **Formulaire de contact** fonctionnel
- **Particules animées** en arrière-plan de la page d'accueil

## 📱 Pages disponibles

1. **Accueil** - Section hero avec animation de texte typé
2. **À propos** - Informations personnelles et timeline
3. **Projets** - Galerie de projets avec filtres
4. **Compétences** - Barres de progression et cercles de compétences
5. **Contact** - Formulaire de contact et informations

## 🛠️ Technologies utilisées

- **Backend** : Django 5.2.5
- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Animations** : CSS Animations, Canvas API
- **Responsive** : CSS Grid, Flexbox, Media Queries
- **Icônes** : Font Awesome 6.0
- **Polices** : Google Fonts (Inter)

## 📋 Prérequis

- Python 3.8+
- pip
- Virtual environment (recommandé)

## 🔧 Installation

1. **Cloner le repository**
   ```bash
   git clone <url-du-repo>
   cd django_portfolio
   ```

2. **Créer un environnement virtuel**
   ```bash
   python -m venv venv
   ```

3. **Activer l'environnement virtuel**
   - Windows :
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux :
     ```bash
     source venv/bin/activate
     ```

4. **Installer les dépendances**
   ```bash
   pip install -r requirements.txt
   ```

5. **Appliquer les migrations**
   ```bash
   python manage.py migrate
   ```

6. **Lancer le serveur de développement**
   ```bash
   python manage.py runserver
   ```

7. **Ouvrir votre navigateur**
   ```
   http://127.0.0.1:8000/
   ```

## 📁 Structure du projet

```
django_portfolio/
├── manage.py
├── portfolio/                 # Configuration principale Django
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── ms_portfolio/             # Application principale
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── templates/                # Templates HTML
│   └── ms_portfolio/
│       ├── base.html
│       ├── home.html
│       ├── about.html
│       ├── projects.html
│       ├── skills.html
│       └── contact.html
├── static/                   # Fichiers statiques
│   ├── css/
│   │   ├── styles.css
│   │   └── additional-styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── media/                    # Fichiers média uploadés
├── staticfiles/              # Fichiers statiques collectés
└── README.md
```

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `static/css/styles.css` :
```css
:root {
    --primary-color: #6c63ff;      /* Couleur principale */
    --secondary-color: #4d44db;    /* Couleur secondaire */
    --dark-color: #1a1a2e;         /* Couleur sombre */
    --darker-color: #16213e;       /* Couleur plus sombre */
    --light-color: #f1f1f1;        /* Couleur claire */
    --lighter-color: #ffffff;      /* Blanc */
}
```

### Projets
Modifiez le tableau `projects` dans `static/js/main.js` pour ajouter vos propres projets :
```javascript
const projects = [
    {
        title: "Titre du projet",
        category: "web", // web, ui, perso
        image: "chemin/vers/image.jpg",
        description: "Description du projet"
    }
    // ... autres projets
];
```

### Compétences
Modifiez les barres de progression dans `templates/ms_portfolio/skills.html` :
```html
<div class="skill-bar">
    <div class="skill-info">
        <span>Nom de la compétence</span>
        <span>90%</span>
    </div>
    <div class="progress-bar" data-width="90"></div>
</div>
```

## 📱 Responsive Design

Le portfolio est entièrement responsive avec des breakpoints :
- **Desktop** : > 768px
- **Tablet** : ≤ 768px
- **Mobile** : ≤ 480px

## 🌙 Mode sombre/clair

Le bouton de basculement est situé en haut à gauche de la page. Il permet de passer entre :
- **Mode sombre** : Couleurs sombres par défaut
- **Mode clair** : Couleurs claires avec contraste élevé

## 🎭 Animations

### Loader
- Animation des lettres du nom "MOHAMED SARE"
- Chaque lettre rebondit avec un délai différent
- Transition fluide vers le contenu principal

### Curseur personnalisé
- Curseur principal avec effet de différence
- Curseur secondaire qui suit avec délai
- Effets spéciaux sur les éléments interactifs

### Animations au scroll
- Apparition progressive des éléments
- Animation des barres de compétences
- Animation des cercles de progression

## 📧 Formulaire de contact

Le formulaire de contact est entièrement fonctionnel avec :
- Validation côté client
- Gestion des erreurs
- Messages de succès/erreur
- Animation de chargement

## 🚀 Déploiement

### Production
1. Modifier `DEBUG = False` dans `settings.py`
2. Configurer `ALLOWED_HOSTS`
3. Collecter les fichiers statiques :
   ```bash
   python manage.py collectstatic
   ```
4. Configurer votre serveur web (Nginx, Apache)

### Variables d'environnement
Créez un fichier `.env` pour les variables sensibles :
```env
SECRET_KEY=votre_clé_secrète
DEBUG=False
ALLOWED_HOSTS=votre-domaine.com
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Mohamed SARE**
- Développeur web passionné
- Spécialisé en Django et développement frontend
- Basé au Burkina Faso

## 📞 Contact

- **Email** : contact@mohamedsare.com
- **Portfolio** : [Votre URL]
- **LinkedIn** : [Votre profil LinkedIn]
- **GitHub** : [Votre profil GitHub]

---

**Note** : Ce portfolio est conçu pour être un exemple de ce qui peut être réalisé avec Django et des technologies web modernes. N'hésitez pas à l'adapter à vos besoins !
