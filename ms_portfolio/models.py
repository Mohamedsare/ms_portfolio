from django.db import models
from django.utils import timezone

# Create your models here.

class Article(models.Model):
    """Modèle pour les articles de blog"""
    CATEGORY_CHOICES = [
        ('web', 'Développement Web'),
        ('design', 'Design & UX'),
        ('tech', 'Technologies'),
        ('tips', 'Conseils & Astuces'),
        ('news', 'Actualités'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="Slug")
    summary = models.TextField(max_length=500, verbose_name="Résumé")
    content = models.TextField(verbose_name="Contenu")
    image = models.ImageField(upload_to='articles/', verbose_name="Image", blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='web', verbose_name="Catégorie")
    author = models.CharField(max_length=100, default="Mohamed SARE", verbose_name="Auteur")
    published_date = models.DateTimeField(default=timezone.now, verbose_name="Date de publication")
    is_published = models.BooleanField(default=True, verbose_name="Publié")
    views_count = models.PositiveIntegerField(default=0, verbose_name="Nombre de vues")
    
    class Meta:
        verbose_name = "Article"
        verbose_name_plural = "Articles"
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return f'/article/{self.slug}/'
    
    def increment_views(self):
        self.views_count += 1
        self.save(update_fields=['views_count'])

class Project(models.Model):
    """Modèle pour les projets du portfolio"""
    CATEGORY_CHOICES = [
        ('web', 'Application Web'),
        ('mobile', 'Application Mobile'),
        ('desktop', 'Application Desktop'),
        ('design', 'Design & UI/UX'),
        ('ai', 'Intelligence Artificielle'),
        ('game', 'Jeux Vidéo'),
        ('other', 'Autre'),
    ]
    
    STATUS_CHOICES = [
        ('completed', 'Terminé'),
        ('in_progress', 'En cours'),
        ('planned', 'Planifié'),
        ('on_hold', 'En pause'),
    ]
    
    title = models.CharField(max_length=200, verbose_name="Titre")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="Slug")
    summary = models.TextField(max_length=500, verbose_name="Résumé")
    description = models.TextField(verbose_name="Description complète")
    image = models.ImageField(upload_to='projects/', verbose_name="Image principale")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='web', verbose_name="Catégorie")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed', verbose_name="Statut")
    
    # Technologies utilisées
    technologies = models.TextField(verbose_name="Technologies utilisées", help_text="Une par ligne ou séparées par des virgules")
    
    # Liens du projet
    github_url = models.URLField(blank=True, null=True, verbose_name="Lien GitHub")
    live_url = models.URLField(blank=True, null=True, verbose_name="Lien en ligne")
    demo_url = models.URLField(blank=True, null=True, verbose_name="Lien démo")
    
    # Métadonnées
    start_date = models.DateField(verbose_name="Date de début")
    end_date = models.DateField(blank=True, null=True, verbose_name="Date de fin")
    featured = models.BooleanField(default=False, verbose_name="Projet en vedette")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    
    # Statistiques
    views_count = models.PositiveIntegerField(default=0, verbose_name="Nombre de vues")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Dernière modification")
    
    class Meta:
        verbose_name = "Projet"
        verbose_name_plural = "Projets"
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return f'/project/{self.slug}/'
    
    def increment_views(self):
        self.views_count += 1
        self.save(update_fields=['views_count'])
    
    def get_technologies_list(self):
        """Retourne la liste des technologies sous forme de liste"""
        if self.technologies:
            # Diviser par virgules ou retours à la ligne
            tech_list = [tech.strip() for tech in self.technologies.replace('\n', ',').split(',') if tech.strip()]
            return tech_list
        return []
    
    def is_completed(self):
        """Vérifie si le projet est terminé"""
        return self.status == 'completed'
    
    def get_duration(self):
        """Calcule la durée du projet"""
        if self.start_date and self.end_date:
            delta = self.end_date - self.start_date
            days = delta.days
            if days < 30:
                return f"{days} jour{'s' if days > 1 else ''}"
            elif days < 365:
                months = days // 30
                return f"{months} mois"
            else:
                years = days // 365
                return f"{years} an{'s' if years > 1 else ''}"
        return "En cours"

class ContactMessage(models.Model):
    """Modèle pour sauvegarder les messages de contact"""
    STATUS_CHOICES = [
        ('new', 'Nouveau'),
        ('read', 'Lu'),
        ('replied', 'Répondu'),
        ('archived', 'Archivé'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Nom complet")
    email = models.EmailField(verbose_name="Adresse email")
    subject = models.CharField(max_length=200, verbose_name="Sujet")
    message = models.TextField(verbose_name="Message")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name="Statut")
    ip_address = models.GenericIPAddressField(blank=True, null=True, verbose_name="Adresse IP")
    user_agent = models.TextField(blank=True, null=True, verbose_name="User Agent")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de réception")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Dernière modification")
    
    class Meta:
        verbose_name = "Message de contact"
        verbose_name_plural = "Messages de contact"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject} ({self.created_at.strftime('%d/%m/%Y %H:%M')})"
    
    def mark_as_read(self):
        """Marque le message comme lu"""
        self.status = 'read'
        self.save(update_fields=['status'])
    
    def mark_as_replied(self):
        """Marque le message comme répondu"""
        self.status = 'replied'
        self.save(update_fields=['status'])
    
    def archive(self):
        """Archive le message"""
        self.status = 'archived'
        self.save(update_fields=['status'])

class SkillCategory(models.Model):
    """Modèle pour les catégories de compétences"""
    name = models.CharField(max_length=100, verbose_name="Nom de la catégorie")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    is_active = models.BooleanField(default=True, verbose_name="Active")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Dernière modification")
    
    class Meta:
        verbose_name = "Catégorie de compétence"
        verbose_name_plural = "Catégories de compétences"
        ordering = ['order', 'name']
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    """Modèle pour les compétences"""
    TYPE_CHOICES = [
        ('bar', 'Barre de progression'),
        ('circle', 'Cercle de progression'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Nom de la compétence")
    category = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills', verbose_name="Catégorie")
    skill_type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='bar', verbose_name="Type d'affichage")
    percentage = models.PositiveIntegerField(verbose_name="Pourcentage", help_text="Valeur entre 0 et 100")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    is_active = models.BooleanField(default=True, verbose_name="Active")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Dernière modification")
    
    class Meta:
        verbose_name = "Compétence"
        verbose_name_plural = "Compétences"
        ordering = ['category__order', 'category__name', 'order', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.percentage}%)"
    
    def clean(self):
        """Valide que le pourcentage est entre 0 et 100"""
        from django.core.exceptions import ValidationError
        if self.percentage > 100:
            raise ValidationError({'percentage': 'Le pourcentage doit être entre 0 et 100.'})

class CV(models.Model):
    """Modèle pour gérer le CV téléchargeable"""
    title = models.CharField(max_length=200, default="CV - Mohamed SARE", verbose_name="Titre")
    file = models.FileField(upload_to='cv/', verbose_name="Fichier CV", help_text="Format PDF recommandé")
    is_active = models.BooleanField(default=True, verbose_name="Actif", help_text="Si actif, le CV sera disponible au téléchargement")
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Date d'upload")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Dernière modification")
    download_count = models.PositiveIntegerField(default=0, verbose_name="Nombre de téléchargements")
    
    class Meta:
        verbose_name = "CV"
        verbose_name_plural = "CV"
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return f"{self.title} ({'Actif' if self.is_active else 'Inactif'})"
    
    def increment_downloads(self):
        """Incrémente le compteur de téléchargements"""
        self.download_count += 1
        self.save(update_fields=['download_count'])