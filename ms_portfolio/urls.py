from django.urls import path
from . import views

urlpatterns = [
    # Page d'accueil
    path('', views.home, name='home'),
    
    # Articles de blog
    path('article/<slug:slug>/', views.article_detail, name='article_detail'),
    
    # Projets détaillés
    path('project/<slug:slug>/', views.project_detail, name='project_detail'),
    
    # Page à propos
    path('about/', views.about, name='about'),
    
    # Page projets
    path('projects/', views.projects, name='projects'),
    
    # Page compétences
    path('skills/', views.skills, name='skills'),
    
    # Page contact
    path('contact/', views.contact, name='contact'),
    
    # API pour le formulaire de contact
    path('contact/submit/', views.contact_submit, name='contact_submit'),
]
