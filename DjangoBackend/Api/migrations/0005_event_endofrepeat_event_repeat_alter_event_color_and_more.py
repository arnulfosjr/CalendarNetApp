# Generated by Django 5.1.2 on 2024-12-02 05:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0004_alter_event_color_alter_task_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='endOfRepeat',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='event',
            name='repeat',
            field=models.CharField(choices=[('None', 'Never'), ('Daily', 'Daily'), ('Weekly', 'Weekly'), ('Monthly', 'Monthly'), ('Yearly', 'Yearly')], default='None', max_length=10),
        ),
        migrations.AlterField(
            model_name='event',
            name='color',
            field=models.CharField(choices=[('#FD7E14', 'Orange'), ('#33FF57', 'Lime Green'), ('#007BFF', 'Blue'), ('#F1C40F', 'Yellow'), ('#9B59B6', 'Purple'), ('#1ABC9C', 'Teal'), ('#E74C3C', 'Red Coral'), ('#6C757D', 'Gray'), ('#28A745', 'Green'), ('#3498DB', 'Sky Blue')], default='#6C757D', max_length=7),
        ),
        migrations.AlterField(
            model_name='task',
            name='color',
            field=models.CharField(choices=[('#FD7E14', 'Orange'), ('#33FF57', 'Lime Green'), ('#007BFF', 'Blue'), ('#F1C40F', 'Yellow'), ('#9B59B6', 'Purple'), ('#1ABC9C', 'Teal'), ('#E74C3C', 'Red Coral'), ('#6C757D', 'Gray'), ('#28A745', 'Green'), ('#3498DB', 'Sky Blue')], default='#6C757D', max_length=7),
        ),
    ]