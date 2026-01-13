from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
from .models import Article, Project, ContactMessage, SkillCategory, Skill, CV

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """Interface d'administration pour les articles"""
    list_display = ('title', 'category', 'author', 'published_date', 'is_published', 'status_badge', 'views_count', 'preview_link')
    list_filter = ('category', 'is_published', 'published_date', 'author')
    search_fields = ('title', 'summary', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_published',)
    date_hierarchy = 'published_date'
    ordering = ('-published_date',)
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('title', 'slug', 'summary', 'content', 'image')
        }),
        ('Métadonnées', {
            'fields': ('category', 'author', 'published_date', 'is_published')
        }),
        ('Statistiques', {
            'fields': ('views_count',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('views_count',)
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related()
    
    def status_badge(self, obj):
        """Affiche un badge de statut coloré"""
        if obj.is_published:
            return mark_safe(
                '<span class="status-badge published">✓ Publié</span>'
            )
        return mark_safe(
            '<span class="status-badge draft">✗ Brouillon</span>'
        )
    status_badge.short_description = "Statut"
    status_badge.admin_order_field = 'is_published'
    
    def preview_link(self, obj):
        """Lien de prévisualisation"""
        if obj.pk and obj.slug:
            url = reverse('article_detail', args=[obj.slug])
            return format_html(
                '<a href="{}" target="_blank" style="color: #007bff; font-weight: 600; text-decoration: none;">👁️ Voir</a>',
                url
            )
        return "-"
    preview_link.short_description = "Aperçu"

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Interface d'administration pour les projets"""
    list_display = ('title', 'category', 'status', 'status_badge', 'featured', 'featured_badge', 'order', 'views_count', 'start_date', 'preview_link')
    list_filter = ('category', 'status', 'featured', 'start_date', 'end_date')
    search_fields = ('title', 'summary', 'description', 'technologies')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('status', 'featured', 'order')
    date_hierarchy = 'start_date'
    ordering = ('order', '-created_at')
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('title', 'slug', 'summary', 'description', 'image')
        }),
        ('Catégorisation', {
            'fields': ('category', 'status', 'featured', 'order')
        }),
        ('Technologies et liens', {
            'fields': ('technologies', 'github_url', 'live_url', 'demo_url')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date')
        }),
        ('Statistiques', {
            'fields': ('views_count', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('views_count', 'created_at', 'updated_at')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related()
    
    def status_badge(self, obj):
        """Affiche un badge de statut coloré"""
        status_colors = {
            'completed': ('#28a745', '✓ Terminé'),
            'in_progress': ('#ffc107', '⏳ En cours'),
            'planned': ('#17a2b8', '📅 Planifié'),
            'on_hold': ('#dc3545', '⏸ En pause'),
        }
        color, label = status_colors.get(obj.status, ('#6c757d', obj.get_status_display()))
        return format_html(
            '<span class="status-badge" style="background: {}; color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">{}</span>',
            color, label
        )
    status_badge.short_description = "Statut"
    status_badge.admin_order_field = 'status'
    
    def featured_badge(self, obj):
        """Affiche un badge pour les projets mis en avant"""
        if obj.featured:
            return mark_safe(
                '<span class="status-badge" style="background: #ffc107; color: #000; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">⭐ Mis en avant</span>'
            )
        return "-"
    featured_badge.short_description = "Mis en avant"
    featured_badge.admin_order_field = 'featured'
    
    def preview_link(self, obj):
        """Lien de prévisualisation"""
        if obj.pk and obj.slug:
            url = reverse('project_detail', args=[obj.slug])
            return format_html(
                '<a href="{}" target="_blank" style="color: #007bff; font-weight: 600; text-decoration: none;">👁️ Voir</a>',
                url
            )
        return "-"
    preview_link.short_description = "Aperçu"

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Interface d'administration pour les messages de contact"""
    list_display = ('name', 'email', 'subject', 'status', 'status_badge', 'created_at', 'ip_address', 'message_preview')
    list_filter = ('status', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('ip_address', 'user_agent', 'created_at', 'updated_at')
    list_editable = ('status',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    
    fieldsets = (
        ('Informations du contact', {
            'fields': ('name', 'email', 'subject', 'message')
        }),
        ('Statut et suivi', {
            'fields': ('status',)
        }),
        ('Métadonnées techniques', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['mark_as_read', 'mark_as_replied', 'archive_messages']
    
    def mark_as_read(self, request, queryset):
        """Marquer les messages sélectionnés comme lus"""
        updated = queryset.update(status='read')
        self.message_user(request, f'{updated} message(s) marqué(s) comme lu(s).')
    mark_as_read.short_description = "Marquer comme lu"
    
    def mark_as_replied(self, request, queryset):
        """Marquer les messages sélectionnés comme répondu"""
        updated = queryset.update(status='replied')
        self.message_user(request, f'{updated} message(s) marqué(s) comme répondu(s).')
    mark_as_replied.short_description = "Marquer comme répondu"
    
    def archive_messages(self, request, queryset):
        """Archiver les messages sélectionnés"""
        updated = queryset.update(status='archived')
        self.message_user(request, f'{updated} message(s) archivé(s).')
    archive_messages.short_description = "Archiver les messages"
    
    def status_badge(self, obj):
        """Affiche un badge de statut coloré"""
        status_colors = {
            'new': ('#17a2b8', '📧 Nouveau'),
            'read': ('#6c757d', '✓ Lu'),
            'replied': ('#28a745', '✉ Répondu'),
            'archived': ('#dc3545', '📦 Archivé'),
        }
        color, label = status_colors.get(obj.status, ('#6c757d', obj.get_status_display()))
        return format_html(
            '<span class="status-badge" style="background: {}; color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 600;">{}</span>',
            color, label
        )
    status_badge.short_description = "Statut"
    status_badge.admin_order_field = 'status'
    
    def message_preview(self, obj):
        """Aperçu du message"""
        if obj.message:
            preview = obj.message[:50] + "..." if len(obj.message) > 50 else obj.message
            return format_html('<span title="{}">{}</span>', obj.message, preview)
        return "-"
    message_preview.short_description = "Aperçu"

@admin.register(SkillCategory)
class SkillCategoryAdmin(admin.ModelAdmin):
    """Interface d'administration pour les catégories de compétences"""
    list_display = ('name', 'order', 'is_active', 'status_badge', 'skill_count', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'description')
    list_editable = ('order', 'is_active')
    ordering = ('order', 'name')
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('name', 'description')
        }),
        ('Affichage', {
            'fields': ('order', 'is_active')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def skill_count(self, obj):
        """Affiche le nombre de compétences dans cette catégorie"""
        count = obj.skills.count()
        return format_html(
            '<span style="background: #007bff; color: #fff; padding: 4px 10px; border-radius: 12px; font-weight: 600;">{}</span>',
            count
        )
    skill_count.short_description = "Compétences"
    
    def status_badge(self, obj):
        """Affiche un badge de statut"""
        if obj.is_active:
            return mark_safe(
                '<span class="status-badge active">✓ Actif</span>'
            )
        return mark_safe(
            '<span class="status-badge inactive">✗ Inactif</span>'
        )
    status_badge.short_description = "Statut"
    status_badge.admin_order_field = 'is_active'

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """Interface d'administration pour les compétences"""
    list_display = ('name', 'category', 'skill_type', 'percentage', 'percentage_bar', 'order', 'is_active', 'status_badge', 'created_at')
    list_filter = ('category', 'skill_type', 'is_active', 'created_at')
    search_fields = ('name', 'category__name')
    list_editable = ('percentage', 'order', 'is_active')
    ordering = ('category__order', 'order', 'name')
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('name', 'category', 'skill_type')
        }),
        ('Niveau', {
            'fields': ('percentage',),
            'description': 'Valeur entre 0 et 100'
        }),
        ('Affichage', {
            'fields': ('order', 'is_active')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('category')
    
    def percentage_bar(self, obj):
        """Affiche une barre de progression pour le pourcentage"""
        color = '#28a745' if obj.percentage >= 75 else '#ffc107' if obj.percentage >= 50 else '#dc3545'
        return format_html(
            '<div style="display: flex; align-items: center; gap: 10px;">'
            '<div style="flex: 1; background: #e9ecef; border-radius: 10px; height: 20px; overflow: hidden;">'
            '<div style="background: {}; height: 100%; width: {}%; border-radius: 10px; transition: width 0.3s;"></div>'
            '</div>'
            '<span style="font-weight: 600; min-width: 40px;">{}%</span>'
            '</div>',
            color, obj.percentage, obj.percentage
        )
    percentage_bar.short_description = "Niveau"
    percentage_bar.admin_order_field = 'percentage'
    
    def status_badge(self, obj):
        """Affiche un badge de statut"""
        if obj.is_active:
            return mark_safe(
                '<span class="status-badge active">✓ Actif</span>'
            )
        return mark_safe(
            '<span class="status-badge inactive">✗ Inactif</span>'
        )
    status_badge.short_description = "Statut"
    status_badge.admin_order_field = 'is_active'

@admin.register(CV)
class CVAdmin(admin.ModelAdmin):
    """Interface d'administration pour le CV"""
    list_display = ('title', 'is_active', 'status_badge', 'download_count_badge', 'file_link', 'uploaded_at', 'updated_at')
    list_filter = ('is_active', 'uploaded_at')
    search_fields = ('title',)
    list_editable = ('is_active',)
    readonly_fields = ('download_count', 'uploaded_at', 'updated_at')
    date_hierarchy = 'uploaded_at'
    ordering = ('-uploaded_at',)
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('title', 'file', 'is_active')
        }),
        ('Statistiques', {
            'fields': ('download_count', 'uploaded_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request)
    
    def status_badge(self, obj):
        """Affiche un badge de statut"""
        if obj.is_active:
            return mark_safe(
                '<span class="status-badge active">✓ Actif</span>'
            )
        return mark_safe(
            '<span class="status-badge inactive">✗ Inactif</span>'
        )
    status_badge.short_description = "Statut"
    status_badge.admin_order_field = 'is_active'
    
    def download_count_badge(self, obj):
        """Affiche le nombre de téléchargements avec un badge"""
        return format_html(
            '<span style="background: #007bff; color: #fff; padding: 4px 10px; border-radius: 12px; font-weight: 600;">📥 {} téléchargement(s)</span>',
            obj.download_count
        )
    download_count_badge.short_description = "Téléchargements"
    download_count_badge.admin_order_field = 'download_count'
    
    def file_link(self, obj):
        """Lien vers le fichier CV"""
        if obj.file:
            return format_html(
                '<a href="{}" target="_blank" style="color: #007bff; font-weight: 600; text-decoration: none;">📄 Voir le CV</a>',
                obj.file.url
            )
        return "-"
    file_link.short_description = "Fichier"
