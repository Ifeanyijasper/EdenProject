# Generated by Django 3.1.5 on 2021-03-09 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0002_auto_20210309_1508'),
    ]

    operations = [
        migrations.RenameField(
            model_name='products',
            old_name='image',
            new_name='img',
        ),
        migrations.RenameField(
            model_name='services',
            old_name='image',
            new_name='img',
        ),
    ]
