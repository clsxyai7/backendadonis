import Teacher from '#models/teacher'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    const teachersData = [
{ firstname: 'Grégory', name: 'Charmier', email: 'gregory.charmier@eduvaud.ch' },
{ firstname: 'Antoine', name: 'Mveng', email: 'antoine.mveng@eduvaud.ch' },
{ firstname: 'Gaël', name: 'Sonney', email: 'gael.sonney@eduvaud.ch' },
{ firstname: 'Alain', name: 'Girardet', email: 'alain.girardet@eduvaud.ch' },
]
for (const teacher of teachersData) {
// Création de l'utilisateur correspondant
// Le mot de passe est automatiquement haché grâce à withAuthFinder
const user = await User.create({
fullName: `${teacher.firstname} ${teacher.name}`,
email: teacher.email,
password: '0123456789',
role: 'teacher',
})
await Teacher.create({
firstname: teacher.firstname,
  name: teacher.name,
  email: teacher.email,
userId: user.id,
})
}
  }
}