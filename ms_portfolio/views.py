from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
import json
from .models import Article, Project

# Vue pour la page d'accueil
def home(request):
    """Vue pour la page d'accueil du portfolio"""
    # Récupérer les 3 derniers articles publiés
    latest_articles = Article.objects.filter(
        is_published=True,
        published_date__lte=timezone.now()
    ).order_by('-published_date')[:3]
    
    context = {
        'page_title': 'Accueil - Portfolio Mohamed SARE',
        'active_page': 'home',
        'latest_articles': latest_articles
    }
    return render(request, 'ms_portfolio/home.html', context)

# Vue pour afficher un article complet
def article_detail(request, slug):
    """Vue pour afficher un article complet"""
    article = get_object_or_404(Article, slug=slug, is_published=True)
    
    # Incrémenter le compteur de vues
    article.increment_views()
    
    # Récupérer les articles similaires
    similar_articles = Article.objects.filter(
        category=article.category,
        is_published=True
    ).exclude(id=article.id).order_by('-published_date')[:3]
    
    context = {
        'page_title': f'{article.title} - Portfolio Mohamed SARE',
        'active_page': 'blog',
        'article': article,
        'similar_articles': similar_articles
    }
    return render(request, 'ms_portfolio/article_detail.html', context)

# Vue pour afficher un projet détaillé
def project_detail(request, slug):
    """Vue pour afficher un projet détaillé"""
    project = get_object_or_404(Project, slug=slug)
    
    # Incrémenter le compteur de vues
    project.increment_views()
    
    # Récupérer les projets similaires
    similar_projects = Project.objects.filter(
        category=project.category
    ).exclude(id=project.id).order_by('order', '-created_at')[:3]
    
    context = {
        'page_title': f'{project.title} - Portfolio Mohamed SARE',
        'active_page': 'projects',
        'project': project,
        'similar_projects': similar_projects
    }
    return render(request, 'ms_portfolio/project_detail.html', context)

# Vue pour la page à propos
def about(request):
    """Vue pour la page à propos"""
    context = {
        'page_title': 'À propos - Portfolio Mohamed SARE',
        'active_page': 'about'
    }
    return render(request, 'ms_portfolio/about.html', context)

# Vue pour la page projets
def projects(request):
    """Vue pour la page projets"""
    # Récupérer tous les projets publiés
    projects_list = Project.objects.all().order_by('order', '-created_at')
    
    # Récupérer les catégories uniques pour les filtres
    categories = Project.CATEGORY_CHOICES
    
    context = {
        'page_title': 'Projets - Portfolio Mohamed SARE',
        'active_page': 'projects',
        'projects': projects_list,
        'categories': categories
    }
    return render(request, 'ms_portfolio/projects.html', context)

# Vue pour la page compétences
def skills(request):
    """Vue pour la page compétences"""
    context = {
        'page_title': 'Compétences - Portfolio Mohamed SARE',
        'active_page': 'skills'
    }
    return render(request, 'ms_portfolio/skills.html', context)

# Vue pour la page contact
def contact(request):
    """Vue pour la page contact"""
    context = {
        'page_title': 'Contact - Portfolio Mohamed SARE',
        'active_page': 'contact'
    }
    return render(request, 'ms_portfolio/contact.html', context)

# Vue pour le traitement du formulaire de contact
@csrf_exempt
def contact_submit(request):
    """Traitement du formulaire de contact"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name', '')
            email = data.get('email', '')
            subject = data.get('subject', '')
            message = data.get('message', '')
            
            # Sauvegarder le message en base de données
            from .models import ContactMessage
            contact_message = ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message,
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )
            
            return JsonResponse({
                'success': True,
                'message': 'Votre message a bien été envoyé ! Je vous répondrai dans les plus brefs délais.'
            })
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'message': 'Erreur lors du traitement de votre message.'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'message': f'Erreur lors de l\'enregistrement : {str(e)}'
            })
    
    return JsonResponse({
        'success': False,
        'message': 'Méthode non autorisée.'
    })
