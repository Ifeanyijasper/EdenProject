# Generated by Django 3.1.5 on 2021-02-26 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('share', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Purchases',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client', models.CharField(max_length=200, null=True)),
                ('worker', models.CharField(max_length=200, null=True)),
                ('product', models.JSONField()),
                ('service', models.JSONField()),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('total', models.FloatField()),
            ],
        ),
    ]
