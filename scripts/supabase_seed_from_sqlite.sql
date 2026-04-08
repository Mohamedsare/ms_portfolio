-- Généré par scripts/export_sqlite_to_supabase.py
-- Exécutez d'abord supabase/schema.sql (racine du dépôt) sur Supabase.
BEGIN;
TRUNCATE public.contact_messages, public.skills, public.skill_categories, public.projects, public.articles RESTART IDENTITY CASCADE;
INSERT INTO public.articles (title, slug, summary, content, image_url, category, author, published_date, is_published, views_count)
VALUES ('Cours Laravel 12 — CRUD (Create, Read, Update, Delete)', 'cours-laravel-12-crud-create-read-update-delete', 'mise en œuvre d’un CRUD (Create, Read, Update, Delete) avec Laravel 12, adapté à un étudiant en génie informatique. Je présente à la fois les concepts et les commandes concrètes pour créer un CRUD opérationnel.', '# **Cours Laravel 12 — CRUD (Create, Read, Update, Delete)**

## **1. Introduction au CRUD**

**CRUD** est un acronyme qui désigne les **quatre opérations fondamentales** pour manipuler des informations dans une base de données :

| Opération | Signification                  | Méthode HTTP  |                  |
| --------- | ------------------------------ | ------------- | ---------------- |
| Create    | Créer un nouvel enregistrement | `POST`        |                  |
| Read      | Lire/afficher des données      | `GET`         |                  |
| Update    | Modifier une donnée existante  | `PUT`/`PATCH` |                  |
| Delete    | Supprimer une donnée           | `DELETE`      | ([Wikipédia][1]) |

Laravel utilise **Eloquent ORM** pour faciliter ces opérations de manière expressive et orientée objet. ([Laravel][2])

---

## **2. Pré-requis**

Avant de commencer :

* PHP 8.1+
* Composer installé
* Serveur web (Apache / Nginx)
* Base de données (MySQL / PostgreSQL / SQLite)
* Connaissances de base en MVC

---

## **3. Création d’un projet Laravel**

Dans votre terminal :

```bash
composer create-project laravel/laravel my-crud-app
cd my-crud-app
php artisan serve
```

L’application tourne généralement sur :
`http://127.0.0.1:8000` ([Medium][3])

---

## **4. Configuration de la base de données**

Ouvrez le fichier `.env` à la racine de votre projet et renseignez vos identifiants :

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=crud_db
DB_USERNAME=root
DB_PASSWORD=
```

Puis lancez la migration par défaut :

```bash
php artisan migrate
```

---

## **5. Génération du modèle, migration et contrôleur**

Pour un module par exemple `Product`, créez :

```bash
php artisan make:model Product -mcr --requests
```

Cette commande génère :

* **Model** : `app/Models/Product.php`
* **Migration** : fichier dans `database/migrations`
* **Controller** : `app/Http/Controllers/ProductController.php`
* **Requests** : validations souhaitées ([PHP Tricks][4])

---

## **6. Définition de la migration**

Ouvrez le fichier de migration (quelque chose comme `2025_xx_xx_create_products_table.php`) et définissez vos colonnes :

```php
public function up(): void
{
    Schema::create(''products'', function (Blueprint $table) {
        $table->id();
        $table->string(''name'');
        $table->decimal(''price'', 10, 2);
        $table->text(''description'')->nullable();
        $table->timestamps();
    });
}
```

Puis :

```bash
php artisan migrate
```

---

## **7. Configuration du contrôleur (CRUD)**

Dans `ProductController.php`, utilisez les méthodes standards d’un contrôleur ressource :

| Méthode                                      | But                            |                      |
| -------------------------------------------- | ------------------------------ | -------------------- |
| `index()`                                    | Liste des produits             |                      |
| `create()`                                   | Formulaire de création         |                      |
| `store(Request $request)`                    | Enregistrer un nouveau produit |                      |
| `show(Product $product)`                     | Afficher un produit            |                      |
| `edit(Product $product)`                     | Formulaire pour modifier       |                      |
| `update(Request $request, Product $product)` | Mettre à jour                  |                      |
| `destroy(Product $product)`                  | Supprimer                      | ([Laravel Daily][5]) |

Exemple simple de `store()` :

```php
public function store(Request $request)
{
    $validated = $request->validate([
        ''name'' => ''required|string'',
        ''price'' => ''required|numeric'',
    ]);

    Product::create($validated);

    return redirect()->route(''products.index'');
}
```

---

## **8. Définition des routes**

Dans `routes/web.php` ajoutez :

```php
Route::resource(''products'', ProductController::class);
```

Cela génère automatiquement toutes les routes CRUD conformes (index, create, store, etc.). ([Laravel Daily][5])

---

## **9. Création des vues Blade**

Créez les vues dans `resources/views/products/` :

### **Liste (index.blade.php)**

```blade
@foreach ($products as $product)
    <div>{{ $product->name }} - {{ $product->price }}</div>
@endforeach
```

### **Formulaire création (create.blade.php)**

```blade
<form action="{{ route(''products.store'') }}" method="POST">
    @csrf
    <input name="name" />
    <input name="price" />
    <button type="submit">Ajouter</button>
</form>
```

### **Formulaire modification (edit.blade.php)**

```blade
<form action="{{ route(''products.update'', $product) }}" method="POST">
    @csrf
    @method(''PUT'')
    <input name="name" value="{{ $product->name }}" />
    <button type="submit">Modifier</button>
</form>
```

Les vues `show.blade.php` et autres sont similaires selon le besoin.

---

## **10. Récapitulatif des étapes**

| Étape | Description                  |               |
| ----- | ---------------------------- | ------------- |
| 1     | Installer Laravel            |               |
| 2     | Configurer la base           |               |
| 3     | Créer modèle & migration     |               |
| 4     | Définir migrations & migrer  |               |
| 5     | Générer contrôleur ressource |               |
| 6     | Définir routes CRUD          |               |
| 7     | Construire vues Blade        |               |
| 8     | Tester l’application         | ([Medium][3]) |

---

## **11. Concepts avancés (optionnels)**

Laravel facilite également l’ajout de :

* **Validation avancée**
* **Pagination**
* **Upload d’images**
* **CRUD via API**
* **Protection CSRF**
* **Messages flash** ([Portfolio Mohamed SARE][6])

---', '/media/articles/im.png', 'web', 'Mohamed SARE', '2026-01-13 03:49:31', TRUE, 15);
INSERT INTO public.projects (title, slug, summary, description, image_url, category, status, technologies, github_url, live_url, demo_url, start_date, end_date, featured, "order", views_count, created_at)
VALUES ('sfsfdgvsdxfbxdfc', 'sfsfdgvsdxfbxdfc', 'dxfbvxdfbfdxfcgbcbvc', 'gf;,bjmpsd èrçgoq_jpkqefsp gdvclbh,;xdfsg', '/media/projects/im.png', 'desktop', 'completed', 'rsfg:;qsn^pe fç,qlguf b cv', 'https://mohamedsare.com/', 'https://algocodebf.com', 'https://algocodebf.com', '2026-01-13', '2026-01-13', FALSE, 0, 2, '2026-01-13 06:23:43.747817');
COMMIT;
