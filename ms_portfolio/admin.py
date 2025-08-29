from django.contrib import admin
from .models import Article, Project, ContactMessage

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    """Interface d'administration pour les articles"""
    list_display = ('title', 'category', 'author', 'published_date', 'is_published', 'views_count')
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

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Interface d'administration pour les projets"""
    list_display = ('title', 'category', 'status', 'featured', 'order', 'views_count', 'start_date')
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

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Interface d'administration pour les messages de contact"""
    list_display = ('name', 'email', 'subject', 'status', 'created_at', 'ip_address')
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
