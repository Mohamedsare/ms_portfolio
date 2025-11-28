from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, FileResponse, Http404, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.conf import settings
import json
import os
from .models import Article, Project, CV

# Vue pour la page d'accueil
def home(request):
    """Vue pour la page d'accueil du portfolio"""
    # Récupérer les 3 derniers articles publiés
    latest_articles = Article.objects.filter(
        is_published=True,
        published_date__lte=timezone.now()
    ).order_by('-published_date')[:3]
    
    context = {
        'page_title': 'Accueil - Portfolio Mohamed SARE - Développeur Web Python/Django, IA et Cybersécurité | Burkina Faso & Maroc',
        'active_page': 'home',
        'latest_articles': latest_articles,
        'meta_description': 'Portfolio officiel de Mohamed SARE — Développeur Web, Python/Django, Intelligence Artificielle et Cybersécurité. Basé au Burkina Faso et au Maroc, je crée des applications web modernes, rapides et sécurisées. Étudiant en génie informatique, passionné par l\'IA, les projets innovants et la création de solutions technologiques utiles pour l\'Afrique.',
        'meta_keywords': 'Mohamed Saré, Mohamed SARE, développeur web Burkina Faso, développeur Django, développeur Python, génie informatique, portfolio développeur, intelligence artificielle, machine learning Burkina Faso, cybersécurité Burkina Faso, développeur web Maroc, DUT génie informatique, développeur backend Python, création site web Burkina Faso, expert informatique Burkina Faso, développeur full stack, développeur back-end Python, développeur Django Maroc, développeur IA, freelance développeur Burkina Faso',
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
    
    # Construire l'URL canonique
    canonical_url = request.build_absolute_uri(article.get_absolute_url())
    
    # Métadonnées SEO pour l'article
    meta_description = article.summary[:160] if len(article.summary) > 160 else article.summary
    meta_keywords = f"{article.title}, {article.get_category_display}, Mohamed Saré, Mohamed SARE, développeur Django, développeur Python, génie informatique, intelligence artificielle, machine learning Burkina Faso, cybersécurité Burkina Faso, développeur web Maroc, DUT génie informatique, portfolio développeur, développement web, blog développement"
    
    # Image pour Open Graph
    og_image = request.build_absolute_uri(article.image.url) if article.image else request.build_absolute_uri('/static/img/mhd.jpeg')
    
    context = {
        'page_title': f'{article.title} - Portfolio Mohamed SARE | Développeur Web Python/Django, IA et Cybersécurité',
        'active_page': 'blog',
        'article': article,
        'similar_articles': similar_articles,
        'meta_description': meta_description,
        'meta_keywords': meta_keywords,
        'canonical_url': canonical_url,
        'og_type': 'article',
        'og_image': og_image,
        'schema_type': 'BlogPosting',
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
    
    # Construire l'URL canonique
    canonical_url = request.build_absolute_uri(project.get_absolute_url())
    
    # Métadonnées SEO pour le projet
    meta_description = project.summary[:160] if len(project.summary) > 160 else project.summary
    meta_keywords = f"{project.title}, {project.get_category_display}, Mohamed Saré, Mohamed SARE, développeur Django, développeur Python, génie informatique, intelligence artificielle, machine learning Burkina Faso, cybersécurité Burkina Faso, développeur web Maroc, création site web Burkina Faso, portfolio développeur, projet développement, application web moderne et sécurisée"
    
    # Image pour Open Graph
    og_image = request.build_absolute_uri(project.image.url) if project.image else request.build_absolute_uri('/static/img/mhd.jpeg')
    
    context = {
        'page_title': f'{project.title} - Portfolio Mohamed SARE | Développeur Web Python/Django, IA et Cybersécurité',
        'active_page': 'projects',
        'project': project,
        'similar_projects': similar_projects,
        'meta_description': meta_description,
        'meta_keywords': meta_keywords,
        'canonical_url': canonical_url,
        'og_type': 'website',
        'og_image': og_image,
        'schema_type': 'CreativeWork',
    }
    return render(request, 'ms_portfolio/project_detail.html', context)

# Vue pour la page à propos
def about(request):
    """Vue pour la page à propos"""
    context = {
        'page_title': 'À propos - Portfolio Mohamed SARE - Développeur Web Python/Django, IA et Cybersécurité | Burkina Faso & Maroc',
        'active_page': 'about',
        'meta_description': 'Découvrez le parcours de Mohamed SARE, développeur Web Python/Django spécialisé en Intelligence Artificielle et Cybersécurité. Étudiant en génie informatique au Burkina Faso et au Maroc, passionné par l\'IA, les projets innovants et la création de solutions technologiques pour l\'Afrique.',
        'meta_keywords': 'À propos Mohamed Saré, Mohamed SARE, développeur Burkina Faso, développeur Maroc, parcours développeur, DUT Génie Informatique, étudiant génie informatique, développeur Django expérimenté, expert informatique Burkina Faso, développeur IA',
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
        'page_title': 'Projets - Portfolio Mohamed SARE - Développeur Web Python/Django, IA et Cybersécurité | Burkina Faso & Maroc',
        'active_page': 'projects',
        'projects': projects_list,
        'categories': categories,
        'meta_description': 'Découvrez les projets de développement web, applications Django/Python, solutions d\'Intelligence Artificielle et projets de cybersécurité de Mohamed SARE. Applications web modernes et sécurisées créées au Burkina Faso et au Maroc.',
        'meta_keywords': 'Projets développement web, portfolio projets, applications web Django Burkina Faso, projets développeur Python, Mohamed SARE projets, création application web Django Burkina Faso, solution IA et machine learning, projets cybersécurité, applications web moderne et sécurisée',
    }
    return render(request, 'ms_portfolio/projects.html', context)

# Vue pour la page compétences
def skills(request):
    """Vue pour la page compétences"""
    from .models import SkillCategory, Skill
    
    # Récupérer les catégories avec leurs compétences actives
    categories = SkillCategory.objects.filter(
        is_active=True
    ).prefetch_related(
        'skills'
    ).order_by('order', 'name')
    
    # Séparer les compétences par type
    bar_skills = {}
    circle_skills = {}
    
    for category in categories:
        skills_list = category.skills.filter(is_active=True).order_by('order', 'name')
        bar_skills[category] = skills_list.filter(skill_type='bar')
        circle_skills[category] = skills_list.filter(skill_type='circle')
    
    context = {
        'page_title': 'Compétences - Portfolio Mohamed SARE - Développeur Web Python/Django, IA et Cybersécurité | Burkina Faso & Maroc',
        'active_page': 'skills',
        'bar_skills': bar_skills,
        'circle_skills': circle_skills,
        'meta_description': 'Compétences techniques de Mohamed SARE : développement Web Python/Django, Intelligence Artificielle, Machine Learning, Cybersécurité, réseaux informatiques. Expert en Python, Django, IA, cybersécurité et technologies web modernes au Burkina Faso et au Maroc.',
        'meta_keywords': 'Compétences développeur, skills développeur web, technologies développement, Python Django, intelligence artificielle, machine learning, cybersécurité, développeur backend Python, expert en cybersécurité et développement web, compétences full-stack Burkina Faso',
    }
    return render(request, 'ms_portfolio/skills.html', context)

# Vue pour la page contact
def contact(request):
    """Vue pour la page contact"""
    context = {
        'page_title': 'Contact - Portfolio Mohamed SARE - Développeur Web Python/Django, IA et Cybersécurité | Burkina Faso & Maroc',
        'active_page': 'contact',
        'meta_description': 'Contactez Mohamed SARE, développeur Web Python/Django spécialisé en Intelligence Artificielle et Cybersécurité. Disponible pour vos projets de développement web, applications Django/Python, solutions IA et cybersécurité au Burkina Faso et au Maroc. Réponse rapide garantie.',
        'meta_keywords': 'Contact développeur Burkina Faso, contact développeur Maroc, freelance développeur, contact Mohamed SARE, devis développement web, services de développement web professionnel, freelance en développement informatique Burkina Faso, contact développeur Django, contact développeur IA',
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

# Vue pour servir robots.txt
def robots_txt(request):
    """Vue pour servir le fichier robots.txt"""
    robots_path = os.path.join(settings.BASE_DIR, 'static', 'robots.txt')
    try:
        with open(robots_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Remplacer le placeholder par le domaine réel
            domain = request.build_absolute_uri('/').rstrip('/')
            content = content.replace('https://votre-domaine.com', domain)
            return HttpResponse(content, content_type='text/plain')
    except FileNotFoundError:
        # Si le fichier n'existe pas, retourner un robots.txt par défaut
        domain = request.build_absolute_uri('/').rstrip('/')
        return HttpResponse(
            f"User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: {domain}/sitemap.xml",
            content_type='text/plain'
        )

# Vue pour télécharger le CV
def download_cv(request):
    """Vue pour télécharger le CV"""
    try:
        cv = CV.objects.filter(is_active=True).latest('uploaded_at')
        if cv.file:
            # Incrémenter le compteur de téléchargements
            cv.increment_downloads()
            
            # Retourner le fichier pour téléchargement
            file_path = cv.file.path if hasattr(cv.file, 'path') else None
            if file_path and os.path.exists(file_path):
                file_handle = open(file_path, 'rb')
                response = FileResponse(
                    file_handle,
                    content_type='application/pdf'
                )
                filename = os.path.basename(cv.file.name)
                response['Content-Disposition'] = f'attachment; filename="{filename}"'
                return response
            else:
                # Si le fichier n'existe pas localement, utiliser l'URL
                from django.http import HttpResponseRedirect
                return HttpResponseRedirect(cv.file.url)
        else:
            raise Http404("CV non disponible")
    except CV.DoesNotExist:
        raise Http404("Aucun CV disponible. Veuillez uploader un CV depuis l'administration.")
