<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>403 - Forbidden</title>
    <style>
        :root {
            color-scheme: light;
            --bg: #0f172a;
            --bg-soft: #111827;
            --card: rgba(15, 23, 42, 0.88);
            --border: rgba(148, 163, 184, 0.18);
            --text: #e5e7eb;
            --muted: #94a3b8;
            --accent: #38bdf8;
            --accent-strong: #0ea5e9;
            --accent-text: #082f49;
        }

        * {
            box-sizing: border-box;
        }

        html,
        body {
            min-height: 100%;
        }

        body {
            margin: 0;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            background:
                radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 35%),
                linear-gradient(160deg, var(--bg) 0%, var(--bg-soft) 100%);
            color: var(--text);
            display: grid;
            place-items: center;
            padding: 24px;
        }

        .shell {
            width: 100%;
            max-width: 640px;
        }

        .card {
            position: relative;
            overflow: hidden;
            padding: 40px;
            border: 1px solid var(--border);
            border-radius: 28px;
            background: var(--card);
            box-shadow: 0 24px 80px rgba(2, 6, 23, 0.45);
            backdrop-filter: blur(18px);
        }

        .card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.12), transparent 40%);
            pointer-events: none;
        }

        .code {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 72px;
            padding: 10px 14px;
            border-radius: 999px;
            background: rgba(14, 165, 233, 0.16);
            color: #7dd3fc;
            font-weight: 700;
            letter-spacing: 0.08em;
        }

        h1 {
            margin: 20px 0 12px;
            font-size: clamp(2rem, 4vw, 3rem);
            line-height: 1.05;
        }

        p {
            margin: 0;
            color: var(--muted);
            font-size: 1rem;
            line-height: 1.7;
        }

        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 28px;
        }

        .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 14px 20px;
            border-radius: 14px;
            border: 1px solid transparent;
            font-weight: 700;
            text-decoration: none;
            transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .button-primary {
            background: linear-gradient(135deg, var(--accent) 0%, var(--accent-strong) 100%);
            color: var(--accent-text);
            box-shadow: 0 14px 30px rgba(14, 165, 233, 0.28);
        }

        .button-secondary {
            background: rgba(15, 23, 42, 0.45);
            color: var(--text);
            border-color: var(--border);
        }

        .button:hover {
            transform: translateY(-1px);
        }

        .meta {
            margin-top: 18px;
            font-size: 0.95rem;
            color: var(--muted);
        }

        @media (max-width: 640px) {
            .card {
                padding: 28px;
                border-radius: 22px;
            }

            .actions {
                flex-direction: column;
            }

            .button {
                width: 100%;
            }
        }
    </style>
</head>

<body>
    @php
    $user = auth()->user();

    $dashboardRoute = match ($user?->type) {
    'admin' => route('admin.dashboard'),
    'lecturer' => route('lecturer.dashboard'),
    'student' => route('student.dashboard'),
    default => route('login'),
    };

    $dashboardLabel = match ($user?->type) {
    'admin' => 'Ke Dashboard Admin',
    'lecturer' => 'Ke Dashboard Lecturer',
    'student' => 'Ke Dashboard Student',
    default => 'Login',
    };
    @endphp

    <main class="shell">
        <section class="card">
            <span class="code">403</span>
            <h1>Akses ditolak</h1>
            <p>{{ $exception->getMessage() }}</p>

            <div class="actions">
                <a href="{{ $dashboardRoute }}" class="button button-primary">{{ $dashboardLabel }}</a>
            </div>

            @auth
            <div class="meta">Jika halaman ini tidak sesuai dengan role kamu, silakan kembali ke dashboard yang tersedia.</div>
            @endauth
        </section>
    </main>
</body>

</html>