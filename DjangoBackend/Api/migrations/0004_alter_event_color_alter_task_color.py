# Generated by Django 5.1.2 on 2024-12-01 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0003_alter_event_enddate_alter_event_startdate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='color',
            field=models.CharField(choices=[('#FD7E14', 'Orange'), ('#33FF57', 'Lime Green'), ('#007BFF', 'Blue'), ('#F1C40F', 'Yellow'), ('#9B59B6', 'Purple'), ('#1ABC9C', 'Teal'), ('#E74C3C', 'Red Coral'), ('#6C757D', 'Gray'), ('#28A745', 'Green'), ('#3498DB', 'Sky Blue')], max_length=7),
        ),
        migrations.AlterField(
            model_name='task',
            name='color',
            field=models.CharField(choices=[('#FD7E14', 'Orange'), ('#33FF57', 'Lime Green'), ('#007BFF', 'Blue'), ('#F1C40F', 'Yellow'), ('#9B59B6', 'Purple'), ('#1ABC9C', 'Teal'), ('#E74C3C', 'Red Coral'), ('#6C757D', 'Gray'), ('#28A745', 'Green'), ('#3498DB', 'Sky Blue')], max_length=7),
        ),
    ]
