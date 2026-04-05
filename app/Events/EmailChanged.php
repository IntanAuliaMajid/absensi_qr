<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EmailChanged implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $userId;
    public string $newEmail;

    public function __construct(int $userId, string $newEmail, ?string $role = null)
    {
        $this->userId = $userId;
        $this->newEmail = $newEmail;
    }

    public function broadcastOn(): array
    {
        return [
            new PrivateChannel("user.{$this->userId}"),
        ];
    }

    public function broadcastAs(): string
    {
        return 'EmailChanged';
    }

    public function broadcastWith()
    {
        return [
            'message' => "Admin meminta perubahan email ke {$this->newEmail}. Silahkan cek email baru kamu untuk verifikasi",
        ];
    }
}
