<?php

use App\Events\EmailChanged;
use App\Models\Faculty;
use App\Models\Student;
use App\Models\StudyProgram;
use App\Models\User;
use App\Notifications\PendingEmailChangeVerificationNotification;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Notification;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

it('dispatches email changed event when admin updates student email', function () {
    /** @var \Tests\TestCase $this */
    Event::fake([EmailChanged::class]);
    Notification::fake();

    $admin = User::factory()->create([
        'type' => 'admin',
    ]);

    $role = Role::create([
        'name' => 'admin',
        'guard_name' => 'web',
    ]);

    $permission = Permission::create([
        'name' => 'manage_students',
        'guard_name' => 'web',
    ]);

    $role->givePermissionTo($permission);
    $admin->assignRole($role);

    $faculty = Faculty::create([
        'name' => 'Engineering',
    ]);

    $studyProgram = StudyProgram::create([
        'name' => 'Informatics',
        'faculty_id' => $faculty->id,
    ]);

    $studentUser = User::factory()->create([
        'type' => 'student',
    ]);

    $student = Student::create([
        'user_id' => $studentUser->id,
        'nim' => 'S123456',
        'study_program_id' => $studyProgram->id,
        'gender' => null,
        'date_of_birth' => null,
    ]);

    $newEmail = 'updated-student@example.com';

    $response = $this
        ->actingAs($admin)
        ->put(route('admin.students.update', $student), [
            'name' => $studentUser->name,
            'email' => $newEmail,
            'nim' => $student->nim,
            'study_program_id' => $studyProgram->id,
            'gender' => null,
            'date_of_birth' => null,
            'address' => null,
            'password' => null,
            'password_confirmation' => null,
        ]);

    $response->assertRedirect(route('admin.students.index'));

    Event::assertDispatched(EmailChanged::class, function (EmailChanged $event) use ($studentUser, $admin, $newEmail) {
        return $event->userId === $studentUser->id
            && $event->actorUserId === $admin->id
            && $event->newEmail === $newEmail;
    });

    Notification::assertSentOnDemand(PendingEmailChangeVerificationNotification::class);
});
