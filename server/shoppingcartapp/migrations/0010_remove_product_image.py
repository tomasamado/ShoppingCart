# Generated by Django 2.1.2 on 2018-11-20 20:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shoppingcartapp', '0009_auto_20181120_1601'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='image',
        ),
    ]
