# Generated by Django 5.0.6 on 2024-05-17 10:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("stock_monitoring", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="watchlist",
            name="symbols",
            field=models.ManyToManyField(blank=True, to="stock_monitoring.stocksymbol"),
        ),
    ]