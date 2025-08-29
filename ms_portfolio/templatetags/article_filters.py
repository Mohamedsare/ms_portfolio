from django import template
from django.utils.safestring import mark_safe
import markdown
import re

register = template.Library()

@register.filter(name='format_article')
def format_article(content):
    """
    Filtre pour formater le contenu des articles avec Markdown et formatage personnalisé
    """
    if not content:
        return ""
    
    # Convertir le contenu en HTML avec Markdown
    md = markdown.Markdown(extensions=['extra', 'codehilite'])
    html_content = md.convert(content)
    
    # Formatage personnalisé pour les listes avec astérisques
    # Remplacer les lignes commençant par * par des listes HTML
    lines = html_content.split('\n')
    formatted_lines = []
    in_list = False
    
    for line in lines:
        # Détecter les lignes commençant par *
        if line.strip().startswith('* '):
            if not in_list:
                formatted_lines.append('<ul>')
                in_list = True
            # Nettoyer le contenu de la ligne
            clean_line = line.strip()[2:]  # Enlever "* "
            formatted_lines.append(f'<li>{clean_line}</li>')
        else:
            if in_list:
                formatted_lines.append('</ul>')
                in_list = False
            formatted_lines.append(line)
    
    # Fermer la liste si elle est encore ouverte
    if in_list:
        formatted_lines.append('</ul>')
    
    # Joindre les lignes et convertir en HTML sécurisé
    formatted_content = '\n'.join(formatted_lines)
    
    return mark_safe(formatted_content)

@register.filter(name='format_article_simple')
def format_article_simple(content):
    """
    Filtre simple pour formater le contenu des articles
    """
    if not content:
        return ""
    
    # Convertir les retours à la ligne en paragraphes
    paragraphs = content.split('\n\n')
    formatted_paragraphs = []
    
    for paragraph in paragraphs:
        if paragraph.strip():
            # Formater les listes avec astérisques
            if paragraph.strip().startswith('*'):
                # C'est une liste
                lines = paragraph.strip().split('\n')
                list_items = []
                for line in lines:
                    if line.strip().startswith('*'):
                        item = line.strip()[1:].strip()  # Enlever "* " et espaces
                        if item:
                            # Formater le texte en gras dans les listes aussi
                            formatted_item = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', item)
                            list_items.append(f'<li>{formatted_item}</li>')
                
                if list_items:
                    formatted_paragraphs.append(f'<ul>{"".join(list_items)}</ul>')
            else:
                # C'est un paragraphe normal
                # Formater le texte en gras (**texte**)
                formatted_text = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', paragraph.strip())
                formatted_paragraphs.append(f'<p>{formatted_text}</p>')
    
    # Joindre tous les paragraphes
    formatted_content = '\n'.join(formatted_paragraphs)
    
    return mark_safe(formatted_content)

@register.filter(name='format_article_advanced')
def format_article_advanced(content):
    """
    Filtre avancé pour formater le contenu des articles avec tous les types de formatage
    """
    if not content:
        return ""
    
    # Convertir le contenu en HTML avec Markdown complet
    md = markdown.Markdown(extensions=[
        'extra',           # Inclut toutes les extensions de base
        'codehilite',      # Coloration syntaxique du code
        'toc',            # Table des matières
        'sane_lists',     # Listes intelligentes
        'smarty',         # Guillemets intelligents
        'fenced_code',    # Blocs de code avec ``````
        'tables',         # Support des tableaux
        'attr_list',      # Attributs HTML
        'def_list',       # Listes de définitions
        'footnotes',      # Notes de bas de page
        'abbr',           # Abréviations
        'md_in_html'      # Markdown dans HTML
    ])
    
    # Convertir le contenu
    html_content = md.convert(content)
    
    # Post-traitement pour améliorer le rendu
    # Remplacer les listes Markdown par des listes HTML personnalisées
    html_content = re.sub(
        r'<ul>\s*<li>(.*?)</li>\s*</ul>',
        r'<ul class="custom-list"><li>\1</li></ul>',
        html_content,
        flags=re.DOTALL
    )
    
    # Ajouter des classes CSS pour le style
    html_content = html_content.replace('<p>', '<p class="article-paragraph">')
    html_content = html_content.replace('<h1>', '<h1 class="article-heading">')
    html_content = html_content.replace('<h2>', '<h2 class="article-heading">')
    html_content = html_content.replace('<h3>', '<h3 class="article-heading">')
    html_content = html_content.replace('<h4>', '<h4 class="article-heading">')
    html_content = html_content.replace('<h5>', '<h5 class="article-heading">')
    html_content = html_content.replace('<h6>', '<h6 class="article-heading">')
    
    return mark_safe(html_content)
