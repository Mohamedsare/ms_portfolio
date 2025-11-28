"""
Sitemap configuration pour le portfolio de Mohamed SARE
Optimisé pour le référencement au Burkina Faso, en Afrique et dans le Monde
"""

from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from django.utils import timezone
from .models import Article, Project


class StaticViewSitemap(Sitemap):
    """
    Sitemap pour les pages statiques du portfolio
    Priorité élevée pour les pages principales
    """
    priority = 1.0
    changefreq = 'weekly'
    
    def items(self):
        """Liste des pages statiques importantes"""
        return [
            'home',
            'about',
            'projects',
            'skills',
            'contact',
        ]
    
    def location(self, item):
        """Retourne l'URL de chaque page"""
        return reverse(item)
    
    def lastmod(self, item):
        """Date de dernière modification (mise à jour régulière)"""
        return timezone.now()


class ArticleSitemap(Sitemap):
    """
    Sitemap pour les articles de blog
    Priorité élevée pour le contenu frais et régulier
    """
    changefreq = 'weekly'
    
    def items(self):
        """Retourne tous les articles publiés"""
        return Article.objects.filter(
            is_published=True,
            published_date__lte=timezone.now()
        ).order_by('-published_date')
    
    def lastmod(self, obj):
        """Date de dernière modification de l'article"""
        return obj.published_date
    
    def location(self, obj):
        """URL de l'article"""
        return obj.get_absolute_url()
    
    def priority(self, obj):
        """Priorité dynamique basée sur la récence et la popularité"""
        # Articles récents (moins de 30 jours) = priorité plus élevée
        days_old = (timezone.now() - obj.published_date).days
        if days_old < 30:
            return 0.95
        elif days_old < 90:
            return 0.85
        elif obj.views_count > 100:
            return 0.80  # Articles populaires
        return 0.75


class ProjectSitemap(Sitemap):
    """
    Sitemap pour les projets du portfolio
    Priorité élevée pour montrer l'expertise
    """
    changefreq = 'monthly'
    
    def items(self):
        """Retourne tous les projets"""
        return Project.objects.all().order_by('-created_at')
    
    def lastmod(self, obj):
        """Date de dernière modification du projet"""
        return obj.updated_at
    
    def location(self, obj):
        """URL du projet"""
        return obj.get_absolute_url()
    
    def priority(self, obj):
        """Priorité dynamique basée sur le statut et la visibilité"""
        if obj.featured:
            return 0.95  # Projets en vedette = priorité maximale
        elif obj.status == 'completed':
            return 0.85  # Projets terminés
        elif obj.views_count > 50:
            return 0.80  # Projets populaires
        return 0.75


# Configuration du dictionnaire de sitemaps pour Django
# Cette configuration sera utilisée dans portfolio/urls.py
sitemaps = {
    'static': StaticViewSitemap,
    'articles': ArticleSitemap,
    'projects': ProjectSitemap,
}

