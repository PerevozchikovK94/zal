'use strict';
(() => {

/* ---------- catalog ---------- */
const GROUPS = [['legs', 'Ноги и ягодицы', 'Legs & glutes'], ['back', 'Спина', 'Back'], ['chest', 'Грудь и плечи', 'Chest & shoulders'], ['arms', 'Руки', 'Arms'], ['core', 'Кор', 'Core']];
const CATALOG = [
  ['hip-thrust', 'Ягодичный мостик', 'Hip Thrust', 'legs'], ['leg-press', 'Жим ногами', 'Leg Press', 'legs'],
  ['squat', 'Приседания со штангой', 'Back Squat', 'legs'], ['rdl', 'Румынская тяга', 'Romanian Deadlift', 'legs'],
  ['deadlift', 'Становая тяга', 'Deadlift', 'legs'], ['split-squat', 'Болгарские выпады', 'Bulgarian Split Squat', 'legs'],
  ['leg-extension', 'Разгибание ног', 'Leg Extension', 'legs'], ['leg-curl', 'Сгибание ног', 'Leg Curl', 'legs'],
  ['calf-raise', 'Подъём на носки', 'Calf Raise', 'legs'], ['back-extension', 'Гиперэкстензия', 'Back Extension', 'back'],
  ['lat-pulldown', 'Тяга верхнего блока', 'Lat Pulldown', 'back'], ['pull-up', 'Подтягивания', 'Pull-up', 'back'],
  ['cable-row', 'Тяга горизонтального блока', 'Seated Cable Row', 'back'], ['db-row', 'Тяга гантели в наклоне', 'Dumbbell Row', 'back'],
  ['bench-press', 'Жим лёжа', 'Bench Press', 'chest'], ['incline-db-press', 'Жим гантелей на наклонной', 'Incline DB Press', 'chest'],
  ['ohp', 'Жим над головой', 'Overhead Press', 'chest'], ['triceps-pressdown', 'Разгибание на трицепс', 'Triceps Pressdown', 'arms'],
  ['biceps-curl', 'Сгибание на бицепс', 'Biceps Curl', 'arms'], ['crunch', 'Скручивания в тренажёре', 'Machine Crunch', 'core'],
].map(([id, name, en, group], i) => ({id, name, en, group, order: i + 1}));

/* ---------- language ---------- */
let lang = (() => { try { return localStorage.getItem('gymlog.lang'); } catch { return null; } })() || ((navigator.language || '').startsWith('ru') ? 'ru' : 'en');
const STR = {
  ru: {
    workouts: 'Тренировки', exercises: 'Упражнения', settings: 'Настройки', sections: 'Разделы',
    install: 'Чтобы это было приложением: в Safari нажми «Поделиться» → «На экран «Домой»».',
    live: 'Тренировка идёт', exN: n => `${n} упр.`, setsN: n => `${n} подх.`, start: 'Начать тренировку',
    emptyT: 'Пока пусто', emptyD: 'Прошлые тренировки появятся здесь. Историю из Garmin можно загрузить в «Настройках».',
    unlN: n => `${n} без названия`, min: n => `${n} мин`,
    garminHint: 'Garmin не узнал часть упражнений. Подходы подряд с похожим весом собраны вместе — назови их, и они попадут в тренды.',
    unnamed: 'Без названия', other: 'Другое', name: 'Назвать', confirmDel: 'Нажми ещё раз, чтобы удалить', delWorkout: 'Удалить тренировку',
    today: 'Сегодня', finish: 'Завершить', firstT: 'Первое упражнение', firstD: 'Выбери, с чего начинаешь, — подставлю вес с прошлого раза.',
    pr: 'рекорд', firstTime: 'Первый раз', kg: 'кг', reps: 'повторы', bw: 'вес тела', bwShort: 'ВТ',
    wMinus: 'Минус 2,5 кг', wPlus: 'Плюс 2,5 кг', rMinus: 'Минус повтор', rPlus: 'Плюс повтор', weightKg: 'Вес, кг', repsCap: 'Повторы',
    logSet: 'Записать подход', addEx: 'Добавить упражнение', oneWorkout: 'одна тренировка', same: 'как в прошлый раз', vsPrev: d => `${d} кг к прошлому`,
    noTrendT: 'Трендов пока нет', noTrendD: 'Запиши тренировку или подпиши подходы из Garmin.', notYet: 'Ещё без записей',
    noRecT: 'Нет записей', noRecD: 'Добавь это упражнение в тренировку — здесь появится тренд.',
    metric: 'Показатель', workW: 'Рабочий вес', e1rm: 'Расчётный 1ПМ', best: 'лучший', since: d => `с ${d}`, wk: 'трен.',
    epley: '1ПМ по формуле Эпли: вес × (1 + повторы / 30). При 15+ повторах завышает — смотри на тренд.', history: 'История', trend: 'Тренд',
    stored: (n, k) => `${n} трен. · ${k} подх. — хранятся только на этом телефоне`, language: 'Язык',
    import: 'Загрузить историю из файла', export: 'Сохранить резервную копию',
    dataHint: 'Файл с историей из Garmin загружается сюда один раз. Повторная загрузка не создаёт дублей. Резервную копию стоит делать раз в месяц и класть в iCloud Drive: если удалить приложение с экрана «Домой», данные пропадут.',
    done: 'Готово', search: 'Поиск', searchEx: 'Поиск упражнения', garminThinks: 'Garmin думает, это', notInList: 'Нет в списке?', own: 'Своё упражнение',
    nameF: 'Название', namePh: 'Например, отведение бедра', group: 'Группа', add: 'Добавить', set: 'Подход', cancel: 'Отмена', save: 'Сохранить',
    moveSet: 'Другое упражнение', delSet: 'Удалить подход', exercise: 'Упражнение', whatWas: 'Что это было?', setEx: 'Упражнение подхода',
    assigned: (n, e) => `${n} подх. → ${e}`, needW: 'Укажи вес (0 — вес тела)', needR: 'Укажи повторы', newPr: 'Новый рекорд', logged: x => `Записано: ${x}`,
    savedW: n => `Тренировка сохранена · ${n} подх.`, checkWR: 'Проверь вес и повторы', saved: 'Сохранено', setDel: 'Подход удалён', wDel: 'Тренировка удалена',
    loaded: n => `Загружено тренировок: ${n}`, noNew: 'Новых тренировок в файле нет', badFile: 'Не получилось прочитать файл — нужен .json из этого приложения',
    full: 'Не удалось сохранить: память заполнена', ton: 'т',
    account: 'Аккаунт', email: 'Почта', password: 'Пароль', signIn: 'Войти', signUp: 'Создать аккаунт', signOut: 'Выйти',
    toSignUp: 'Нет аккаунта? Создать', toSignIn: 'Уже есть аккаунт? Войти', badLogin: 'Неверная почта или пароль', badEmail: 'Проверь почту',
    shortPw: 'Пароль — минимум 8 символов', taken: 'Такой аккаунт уже есть — войди', authFail: 'Не получилось — проверь сеть и попробуй ещё раз', welcome: 'Готово, синхронизирую', unconfirmed: 'Почта не подтверждена — напиши Косте', confirm: 'Аккаунт создан. Подтверди почту по ссылке из письма и войди',
    acctHint: 'Войди, чтобы тренировки хранились в облаке: они переживут смену телефона, а история с часов будет подтягиваться сама. У каждого своя почта — и своя статистика.',
    syncNow: 'Синхронизировать', synced: x => `Синхронизировано ${x}`, syncing: 'Синхронизирую…', offline: 'Нет сети — синхронизирую позже', notSynced: 'Ещё не синхронизировано',
    garmin: 'Garmin', gHint: 'Тренировки с часов будут подтягиваться сами. Создай личный ключ в Garmin Connect (Настройки → Personal API → Create key, срок — 1 год), скопируй и вставь сюда. Ключ хранится на сервере, приложение его не показывает.',
    gOpen: 'Открыть Garmin Connect', gKey: 'Ключ Personal API', gLink: 'Подключить Garmin', gLinking: 'Подключаю и загружаю историю…',
    gLinked: (n, x) => `Подключено · загружено тренировок: ${n}` + (x ? ` · обновлено ${x}` : ''), gPull: 'Обновить из Garmin', gUnlink: 'Отключить Garmin', gUnlinked: 'Garmin отключён',
    gDone: n => n ? `Из Garmin загружено тренировок: ${n}` : 'Новых тренировок в Garmin нет', gBadKey: 'Garmin не принял ключ — проверь, что скопировал его целиком',
    gExpired: 'Ключ Garmin больше не работает — создай новый и вставь его сюда', gDown: 'Garmin сейчас не отвечает, попробуй позже', gMore: n => `ещё ${n} — догружу при следующей синхронизации`,
    confirmAll: n => `Подтвердить подсказки Garmin (${n})`,
    localOnly: n => `${n} трен. · хранятся на этом телефоне`, cloud: (n, k) => `${n} трен. · ${k} подх. · в облаке`,
  },
  en: {
    workouts: 'Workouts', exercises: 'Exercises', settings: 'Settings', sections: 'Sections',
    install: 'To use it as an app: in Safari tap Share → Add to Home Screen.',
    live: 'Workout in progress', exN: n => `${n} ex.`, setsN: n => `${n} ${n === 1 ? 'set' : 'sets'}`, start: 'Start workout',
    emptyT: 'Nothing here yet', emptyD: 'Past workouts will show up here. Garmin history can be loaded in Settings.',
    unlN: n => `${n} unnamed`, min: n => `${n} min`,
    garminHint: 'Garmin didn’t recognise some exercises. Consecutive sets with similar weight are grouped — name them and they’ll count towards trends.',
    unnamed: 'Unnamed', other: 'Other', name: 'Name it', confirmDel: 'Tap again to delete', delWorkout: 'Delete workout',
    today: 'Today', finish: 'Finish', firstT: 'First exercise', firstD: 'Pick what you start with — I’ll fill in last time’s weight.',
    pr: 'PR', firstTime: 'First time', kg: 'kg', reps: 'reps', bw: 'bodyweight', bwShort: 'BW',
    wMinus: 'Minus 2.5 kg', wPlus: 'Plus 2.5 kg', rMinus: 'One rep fewer', rPlus: 'One rep more', weightKg: 'Weight, kg', repsCap: 'Reps',
    logSet: 'Log set', addEx: 'Add exercise', oneWorkout: 'one workout', same: 'same as last time', vsPrev: d => `${d} kg vs last time`,
    noTrendT: 'No trends yet', noTrendD: 'Log a workout or name your Garmin sets.', notYet: 'Not logged yet',
    noRecT: 'No records', noRecD: 'Add this exercise to a workout and its trend will appear here.',
    metric: 'Metric', workW: 'Working weight', e1rm: 'Estimated 1RM', best: 'best', since: d => `since ${d}`, wk: 'workouts',
    epley: '1RM via the Epley formula: weight × (1 + reps / 30). Overestimates at 15+ reps — watch the trend.', history: 'History', trend: 'Trend',
    stored: (n, k) => `${n} workouts · ${k} sets — stored only on this phone`, language: 'Language',
    import: 'Load history from file', export: 'Save a backup',
    dataHint: 'Load the Garmin history file here once. Loading it again won’t create duplicates. Make a backup monthly and keep it in iCloud Drive: removing the app from the Home Screen deletes its data.',
    done: 'Done', search: 'Search', searchEx: 'Search exercises', garminThinks: 'Garmin thinks it’s', notInList: 'Not on the list?', own: 'Custom exercise',
    nameF: 'Name', namePh: 'e.g. Hip abduction', group: 'Group', add: 'Add', set: 'Set', cancel: 'Cancel', save: 'Save',
    moveSet: 'Different exercise', delSet: 'Delete set', exercise: 'Exercise', whatWas: 'What was this?', setEx: 'Exercise for this set',
    assigned: (n, e) => `${n} sets → ${e}`, needW: 'Enter a weight (0 for bodyweight)', needR: 'Enter reps', newPr: 'New PR', logged: x => `Logged: ${x}`,
    savedW: n => `Workout saved · ${n} sets`, checkWR: 'Check weight and reps', saved: 'Saved', setDel: 'Set deleted', wDel: 'Workout deleted',
    loaded: n => `Workouts loaded: ${n}`, noNew: 'No new workouts in this file', badFile: 'Couldn’t read the file — use a .json from this app',
    full: 'Couldn’t save: storage is full', ton: 't',
    account: 'Account', email: 'Email', password: 'Password', signIn: 'Sign in', signUp: 'Create account', signOut: 'Sign out',
    toSignUp: 'No account? Create one', toSignIn: 'Have an account? Sign in', badLogin: 'Wrong email or password', badEmail: 'Check the email address',
    shortPw: 'Password needs at least 8 characters', taken: 'That account already exists — sign in', authFail: 'Didn’t work — check the connection and try again', welcome: 'Done, syncing', unconfirmed: 'Email not confirmed yet — ask the app owner', confirm: 'Account created. Confirm your email via the link, then sign in',
    acctHint: 'Sign in to keep workouts in the cloud: they survive a new phone, and watch history syncs in automatically. Everyone uses their own email and sees only their own stats.',
    syncNow: 'Sync now', synced: x => `Synced ${x}`, syncing: 'Syncing…', offline: 'Offline — will sync later', notSynced: 'Not synced yet',
    garmin: 'Garmin', gHint: 'Watch workouts will come in automatically. Create a personal key in Garmin Connect (Settings → Personal API → Create key, 1-year expiry), copy it and paste it here. The key is stored on the server; the app never shows it.',
    gOpen: 'Open Garmin Connect', gKey: 'Personal API key', gLink: 'Connect Garmin', gLinking: 'Connecting and loading history…',
    gLinked: (n, x) => `Connected · workouts loaded: ${n}` + (x ? ` · updated ${x}` : ''), gPull: 'Update from Garmin', gUnlink: 'Disconnect Garmin', gUnlinked: 'Garmin disconnected',
    gDone: n => n ? `Workouts loaded from Garmin: ${n}` : 'No new workouts in Garmin', gBadKey: 'Garmin didn’t accept the key — make sure you copied all of it',
    gExpired: 'Your Garmin key stopped working — create a new one and paste it here', gDown: 'Garmin isn’t responding, try later', gMore: n => `${n} more — they’ll load on the next sync`,
    confirmAll: n => `Accept Garmin suggestions (${n})`,
    localOnly: n => `${n} workouts · stored on this phone`, cloud: (n, k) => `${n} workouts · ${k} sets · in the cloud`,
  },
};
const t = (k, ...a) => { const v = STR[lang][k] ?? STR.ru[k]; return typeof v === 'function' ? v(...a) : v; };
const loc = () => lang === 'ru' ? 'ru-RU' : 'en-GB';
const groupLabel = g => { const x = GROUPS.find(q => q[0] === g); return x ? (lang === 'ru' ? x[1] : x[2]) : g; };

/* ---------- storage ---------- */
const KEY = 'gymlog.v1';
let db = load();
function load() {
  let d = null;
  try { d = JSON.parse(localStorage.getItem(KEY)); } catch {}
  if (!d || !Array.isArray(d.sessions)) d = {v: 1, exercises: [], sessions: [], active: null};
  for (const e of CATALOG) if (!d.exercises.some(x => x.id === e.id)) d.exercises.push({...e});
  return d;
}
function persist() {
  trackChanges();
  try { localStorage.setItem(KEY, JSON.stringify(db)); }
  catch { toast(t('full')); }
  scheduleSync();
}

/* ---------- cloud sync (Supabase): local-first, last write wins per workout ---------- */
const CFG = window.ZAL_CONFIG || {};
const cloud = {client: null, user: null, state: 'idle', last: null, timer: null, running: false};
const bare = x => { const {updatedAt, ...rest} = x; return JSON.stringify(rest); };
let shadow = new Map(db.sessions.map(x => [x.id, bare(x)]));
db.dirty = db.dirty || [];
db.tomb = db.tomb || {};
function trackChanges() {
  const now = Date.now(), seen = new Set(), dirty = new Set(db.dirty);
  for (const x of db.sessions) {
    seen.add(x.id);
    const b = bare(x);
    if (shadow.get(x.id) !== b) { x.updatedAt = now; dirty.add(x.id); shadow.set(x.id, b); delete db.tomb[x.id]; }
  }
  for (const id of [...shadow.keys()]) if (!seen.has(id)) { shadow.delete(id); db.tomb[id] = now; dirty.add(id); }
  const custom = JSON.stringify(db.exercises.filter(e => e.id.startsWith('c-')));
  if (custom !== db.customSeen) { db.customSeen = custom; db.customDirty = true; }
  db.dirty = [...dirty];
}
function scheduleSync(delay = 1500) { if (!cloud.user) return; clearTimeout(cloud.timer); cloud.timer = setTimeout(sync, delay); }
async function sync() {
  if (!cloud.client || !cloud.user || cloud.running) return;
  if (!navigator.onLine) { cloud.state = 'offline'; refreshAcct(); return; }
  cloud.running = true; cloud.state = 'syncing'; refreshAcct();
  try {
    const sb = cloud.client, uid = cloud.user.id;
    // push
    const ids = [...db.dirty];
    if (ids.length) {
      const rows = ids.map(id => {
        const x = db.sessions.find(q => q.id === id);
        return x ? {user_id: uid, id, date: x.date, data: x, deleted: false} : {user_id: uid, id, date: today(), data: {}, deleted: true};
      });
      const {error} = await sb.from('sessions').upsert(rows, {onConflict: 'user_id,id'});
      if (error) throw error;
      db.dirty = db.dirty.filter(id => !ids.includes(id));
      for (const id of ids) delete db.tomb[id];
    }
    if (db.customDirty) {
      const {error} = await sb.from('profiles').upsert({user_id: uid, exercises: db.exercises.filter(e => e.id.startsWith('c-'))}, {onConflict: 'user_id'});
      if (error) throw error;
      db.customDirty = false;
    }
    // pull
    let q = sb.from('sessions').select('id,data,deleted,updated_at').order('updated_at', {ascending: true}).limit(1000);
    if (db.pulledAt && db.pulledUser === uid) q = q.gt('updated_at', db.pulledAt);
    const {data: rows, error} = await q;
    if (error) throw error;
    let changed = false;
    for (const row of rows) {
      if (db.dirty.includes(row.id)) continue;
      const i = db.sessions.findIndex(x => x.id === row.id);
      if (row.deleted) { if (i >= 0 && row.id !== db.active) { db.sessions.splice(i, 1); changed = true; } }
      else if (i < 0) { db.sessions.push(row.data); changed = true; }
      else if (bare(db.sessions[i]) !== bare(row.data) && row.id !== db.active) { db.sessions[i] = row.data; changed = true; }
      db.pulledAt = row.updated_at;
    }
    db.pulledUser = uid;
    const prof = await sb.from('profiles').select('exercises').eq('user_id', uid).maybeSingle();
    for (const e of prof.data?.exercises || []) if (!ex(e.id)) { db.exercises.push(e); changed = true; }
    shadow = new Map(db.sessions.map(x => [x.id, bare(x)]));
    db.customSeen = JSON.stringify(db.exercises.filter(e => e.id.startsWith('c-')));
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {}
    cloud.state = 'ok'; cloud.last = new Date();
    if (changed && $('#sheet').hidden && top().v !== 'workout') render();
  } catch (e) {
    cloud.state = navigator.onLine ? 'error' : 'offline';
    console.warn('sync failed', e);
  } finally { cloud.running = false; refreshAcct(); if (db.dirty.length && cloud.state === 'ok') scheduleSync(500); }
}
async function initCloud() {
  if (!CFG.supabaseUrl || !CFG.supabaseKey || !window.supabase) return;
  cloud.client = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey, {auth: {persistSession: true, autoRefreshToken: true, detectSessionInUrl: false}});
  const {data} = await cloud.client.auth.getSession();
  cloud.user = data.session?.user || null;
  cloud.client.auth.onAuthStateChange((_e, session) => { cloud.user = session?.user || null; refreshAcct(); });
  if (top().v === 'settings') render();
  if (cloud.user) { sync(); garminRefresh(); garminPull(false); }
}
addEventListener('online', () => scheduleSync(200));
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') scheduleSync(200); });
function refreshAcct() { const el = document.getElementById('acctStatus'); if (el) el.textContent = acctStatus(); }
function acctStatus() {
  if (cloud.state === 'syncing') return t('syncing');
  if (cloud.state === 'offline') return t('offline');
  if (cloud.last) return t('synced', cloud.last.toLocaleTimeString(loc(), {hour: '2-digit', minute: '2-digit'}));
  return t('notSynced');
}
let authMode = 'in';
const garmin = {status: null, busy: false};
const GSYNC_KEY = 'gymlog.garminAt';
async function garminCall(action, extra = {}) {
  const {data, error} = await cloud.client.functions.invoke('garmin-sync', {body: {action, ...extra}});
  if (error) {
    let body = null; try { body = await error.context?.json?.(); } catch {}
    return {error: body?.error || 'unavailable'};
  }
  return data;
}
async function garminRefresh() { if (!cloud.user) return; const d = await garminCall('status'); if (!d.error) { garmin.status = d; if (top().v === 'settings' && $('#sheet').hidden) render(); } }
async function garminPull(manual) {
  if (!cloud.user || garmin.busy) return;
  if (!manual) { let at = 0; try { at = +localStorage.getItem(GSYNC_KEY) || 0; } catch {} if (Date.now() - at < 30 * 60e3) return; }
  try { localStorage.setItem(GSYNC_KEY, String(Date.now())); } catch {}
  garmin.busy = true; if (manual) render();
  const d = await garminCall('sync');
  garmin.busy = false;
  if (d.linked === false) { garmin.status = d; if (manual) render(); return; }
  if (!d.error) garmin.status = d;
  if (manual) toast(d.result?.ok ? t('gDone', d.result.imported) : d.result?.error === 'key_rejected' ? t('gExpired') : t('gDown'));
  await sync(); if (manual || top().v === 'settings') render();
}
function garminHTML() {
  if (!cloud.user) return '';
  const st = garmin.status;
  let h = `<div class="section-title" style="padding-top:4px">${t('garmin')}</div>`;
  if (st?.linked) {
    const when = st.synced_at ? new Date(st.synced_at).toLocaleTimeString(loc(), {hour: '2-digit', minute: '2-digit'}) : '';
    const err = st.last_error === 'key_rejected' ? `<p class="hint" style="color:var(--danger);padding-bottom:8px">${t('gExpired')}</p>` : '';
    h += err + `<div class="list" style="margin-bottom:12px"><div class="row"><span class="t"><b>Garmin Connect</b><span>${esc(t('gLinked', st.imported || 0, when))}</span></span></div></div>
      <div class="stack" style="margin-bottom:24px"><button class="btn quiet" data-a="g-pull" ${garmin.busy ? 'disabled' : ''}>${garmin.busy ? t('syncing') : t('gPull')}</button>
      ${st.last_error === 'key_rejected' ? garminForm() : ''}<button class="btn danger" data-a="g-unlink">${t('gUnlink')}</button></div>`;
  } else h += `<p class="hint" style="padding-bottom:12px">${t('gHint')}</p><div class="stack" style="margin-bottom:24px">
      <a class="btn quiet" href="https://connect.garmin.com/app/settings/personalApiToken" target="_blank" rel="noopener">${t('gOpen')} ↗</a>${garminForm()}</div>`;
  return h;
}
function garminForm() {
  return `<form id="garminForm" class="stack"><label class="field">${t('gKey')}<input id="garminKey" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" required></label>
    <button class="btn primary" type="submit" ${garmin.busy ? 'disabled' : ''}>${garmin.busy ? t('gLinking') : t('gLink')}</button></form>`;
}
async function garminLink() {
  const key = ($('#garminKey').value || '').trim(); if (!key) return;
  garmin.busy = true; render(); toast(t('gLinking'));
  const d = await garminCall('link', {key});
  garmin.busy = false;
  if (d.error) { toast(d.error === 'key_rejected' || d.error === 'bad_key' ? t('gBadKey') : t('gDown')); render(); return; }
  garmin.status = d; try { localStorage.setItem(GSYNC_KEY, String(Date.now())); } catch {}
  const n = d.result?.imported || 0, rest = d.result?.remaining || 0;
  toast(t('gDone', n) + (rest ? ' · ' + t('gMore', rest) : ''));
  await sync(); render();
}
document.addEventListener('submit', ev => { if (ev.target.id === 'garminForm') { ev.preventDefault(); garminLink(); } });
function acctHTML() {
  if (!cloud.client) return '';
  if (cloud.user) return `<div class="section-title" style="padding-top:4px">${t('account')}</div>
    <div class="list" style="margin-bottom:12px"><div class="row"><span class="t"><b>${esc(cloud.user.email || '')}</b><span id="acctStatus">${esc(acctStatus())}</span></span><button class="nav-btn" data-a="sync-now">${t('syncNow')}</button></div></div>
    <button class="btn quiet" data-a="sign-out" style="margin-bottom:24px">${t('signOut')}</button>`;
  return `<div class="section-title" style="padding-top:4px">${t('account')}</div>
    <p class="hint" style="padding-bottom:12px">${t('acctHint')}</p>
    <form class="stack" id="authForm" style="margin-bottom:24px">
      <label class="field">${t('email')}<input id="authEmail" type="email" inputmode="email" autocomplete="username" autocapitalize="off" required></label>
      <label class="field">${t('password')}<input id="authPw" type="password" autocomplete="${authMode === 'in' ? 'current-password' : 'new-password'}" minlength="8" required></label>
      <button class="btn primary" type="submit">${authMode === 'in' ? t('signIn') : t('signUp')}</button>
      <button class="btn quiet" type="button" data-a="auth-mode">${authMode === 'in' ? t('toSignUp') : t('toSignIn')}</button>
    </form>`;
}
async function authSubmit() {
  const email = ($('#authEmail').value || '').trim(), password = $('#authPw').value || '';
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { toast(t('badEmail')); return; }
  if (password.length < 8) { toast(t('shortPw')); return; }
  const btn = $('#authForm button[type=submit]'); btn.disabled = true;
  try {
    const res = authMode === 'in'
      ? await cloud.client.auth.signInWithPassword({email, password})
      : await cloud.client.auth.signUp({email, password});
    if (res.error) {
      const m = (res.error.message || '').toLowerCase();
      toast(m.includes('already') ? t('taken') : m.includes('not confirmed') ? t('unconfirmed') : m.includes('invalid') ? t('badLogin') : t('authFail')); return;
    }
    if (!res.data.session) { toast(t('confirm')); authMode = 'in'; render(); return; }
    cloud.user = res.data.session.user;
    db.dirty = [...new Set([...db.dirty, ...db.sessions.map(x => x.id)])]; db.customDirty = true; db.pulledAt = null;
    render(); toast(t('welcome')); sync(); garminRefresh();
  } catch { toast(t('authFail')); }
  finally { if (btn.isConnected) btn.disabled = false; }
}
document.addEventListener('submit', ev => { if (ev.target.id === 'authForm') { ev.preventDefault(); authSubmit(); } });
try { navigator.storage?.persist?.(); } catch {}

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
let nf, nfw, dfDay, dfShort, dfMonth, dfFull;
function setupFormat() {
  nf = new Intl.NumberFormat(loc(), {maximumFractionDigits: 1});
  nfw = new Intl.NumberFormat(loc(), {maximumFractionDigits: 2});
  dfDay = new Intl.DateTimeFormat(loc(), {weekday: 'short', day: 'numeric', month: 'long'});
  dfShort = new Intl.DateTimeFormat(loc(), {day: 'numeric', month: 'short'});
  dfMonth = new Intl.DateTimeFormat(loc(), {month: 'long', year: 'numeric'});
  dfFull = new Intl.DateTimeFormat(loc(), {weekday: 'long', day: 'numeric', month: 'long'});
  document.documentElement.lang = lang;
}
setupFormat();
const fW = w => nfw.format(w);
const numStr = v => lang === 'ru' ? String(v).replace('.', ',') : String(v);
const parseISO = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const toISO = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const today = () => toISO(new Date());
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const fDay = iso => cap(dfDay.format(parseISO(iso)).replace(',', ''));
const fShort = iso => dfShort.format(parseISO(iso)).replace('.', '');
const fFull = iso => cap(dfFull.format(parseISO(iso)));
const num = v => { const n = parseFloat(String(v).replace(',', '.').replace(/\s/g, '')); return isFinite(n) ? n : NaN; };
const e1rm = (w, r) => (w > 0 && r > 0) ? (r === 1 ? w : w * (1 + r / 30)) : 0;
const setTxt = x => (x.w > 0 ? fW(x.w) + ' ' + t('kg') : t('bw')) + ' × ' + x.r;
const setShort = x => (x.w > 0 ? fW(x.w) : t('bwShort')) + '×' + x.r;
const rid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const vol = sets => sets.reduce((a, x) => a + x.w * x.r, 0);
const fTon = kg => kg >= 1000 ? nf.format(kg / 1000) + ' ' + t('ton') : nf.format(kg) + ' ' + t('kg');

const ex = id => db.exercises.find(e => e.id === id);
const dispName = e => (lang === 'en' && e.en) ? e.en : e.name;
const altName = e => lang === 'en' ? (e.en ? e.name : '') : (e.en || '');
const exName = id => { const e = ex(id); return e ? dispName(e) : t('exercise'); };
const sessionsDesc = () => db.sessions.slice().sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : (b.startedAt || 0) - (a.startedAt || 0));
const finished = () => sessionsDesc().filter(s => s.id !== db.active);
const active = () => db.sessions.find(s => s.id === db.active) || null;
const exOrder = s => { const o = [...(s.order || [])]; for (const x of s.sets) if (x.ex && !o.includes(x.ex)) o.push(x.ex); return o; };

function history(exId) {
  const out = [];
  for (const s of sessionsDesc().reverse()) {
    const sets = s.sets.filter(x => x.ex === exId);
    if (!sets.length) continue;
    const top = sets.reduce((a, b) => (b.w > a.w || (b.w === a.w && b.r > a.r)) ? b : a);
    out.push({sid: s.id, date: s.date, sets, top, w: top.w, e: Math.max(...sets.map(x => e1rm(x.w, x.r)))});
  }
  return out;
}
function lastFor(exId, exceptId) {
  for (const s of sessionsDesc()) {
    if (s.id === exceptId) continue;
    const sets = s.sets.filter(x => x.ex === exId);
    if (sets.length) return {date: s.date, sets};
  }
  return null;
}
function bestBefore(exId, sid) {
  let b = 0;
  for (const s of db.sessions) if (s.id !== sid) for (const x of s.sets) if (x.ex === exId) b = Math.max(b, e1rm(x.w, x.r));
  return b;
}

/* ---------- navigation ---------- */
const nav = {tab: 'workouts', stack: []};
const top = () => nav.stack[nav.stack.length - 1] || {v: nav.tab};
function push(v) { nav.stack.push(v); render(); scrollTo(0, 0); }
function pop() { nav.stack.pop(); render(); }
const drafts = {};
let armed = null;

/* ---------- render ---------- */
function render() {
  const v = top();
  const html = v.v === 'workouts' ? vWorkouts() : v.v === 'session' ? vSession(v.id) : v.v === 'workout' ? vWorkout()
    : v.v === 'exercises' ? vExercises() : v.v === 'exercise' ? vExercise(v.id) : vSettings();
  $('#app').innerHTML = `<div class="screen">${html}</div>${tabbar()}`;
  if (v.v === 'exercise') drawChart();
}
function header({back, title, sub, right}) {
  return `<header class="nav"><div class="nav-row">${back ? `<button class="nav-btn" data-a="back">‹ ${esc(back)}</button>` : '<span></span>'}${right || ''}</div>
    <h1>${esc(title)}${sub ? `<span class="sub">${esc(sub)}</span>` : ''}</h1></header>`;
}
function tabbar() {
  const cur = nav.tab;
  return `<nav class="tabbar" aria-label="${t('sections')}"><div class="tabbar-in">
    <button data-tab="workouts" ${cur === 'workouts' ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 9.5v5M6 7v10M18 7v10M21 9.5v5M6 12h12"/></svg>${t('workouts')}</button>
    <button data-tab="exercises" ${cur === 'exercises' ? 'aria-current="page"' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19h16M5 15l4.5-5 3.5 3 6-7"/></svg>${t('exercises')}</button>
  </div></nav>`;
}

function vWorkouts() {
  const a = active();
  let h = header({title: t('workouts'), right: `<button class="nav-btn" data-a="settings">${t('settings')}</button>`});
  const standalone = navigator.standalone || matchMedia('(display-mode: standalone)').matches;
  if (!standalone && /iPhone|iPad/.test(navigator.userAgent)) h += `<div class="install"><span>${t('install')}</span></div>`;
  h += a
    ? `<button class="live" data-a="open-workout"><span><b>${t('live')}</b><span>${t('exN', exOrder(a).length)} · ${t('setsN', a.sets.length)}</span></span><span class="chev" style="color:inherit">›</span></button>`
    : `<button class="btn primary" data-a="start">${t('start')}</button>`;
  const list = finished();
  if (!list.length) return h + `<div class="empty"><b>${t('emptyT')}</b>${t('emptyD')}</div>`;
  const months = [];
  for (const s of list) {
    const m = cap(dfMonth.format(parseISO(s.date))).replace(' г.', '');
    if (!months.length || months[months.length - 1].m !== m) months.push({m, rows: []});
    const names = exOrder(s).map(exName);
    const unl = s.sets.filter(x => !x.ex).length;
    const sub = [names.length ? esc(names.join(', ')) : '', unl ? `<span class="warn">${t('unlN', unl)}</span>` : ''].filter(Boolean).join(' · ');
    months[months.length - 1].rows.push(`<button class="row" data-a="open-session" data-id="${esc(s.id)}"><span class="t"><b>${esc(fDay(s.date))}</b><span>${sub}</span></span><span class="v"><b>${s.sets.length}</b><span>${lang === 'ru' ? 'подх.' : (s.sets.length === 1 ? 'set' : 'sets')}</span></span><span class="chev">›</span></button>`);
  }
  return h + months.map(g => `<div class="section-title">${esc(g.m)}</div><div class="list">${g.rows.join('')}</div>`).join('');
}

function vSession(id) {
  const s = db.sessions.find(x => x.id === id);
  if (!s) { nav.stack.pop(); return vWorkouts(); }
  const meta = [s.source === 'garmin' ? 'Garmin' : null, s.start, s.dur ? t('min', s.dur) : null, t('setsN', s.sets.length), fTon(vol(s.sets))].filter(Boolean).join(' · ');
  let h = header({back: t('workouts'), title: fFull(s.date), sub: meta});
  const groups = [];
  s.sets.forEach((x, i) => {
    const key = x.ex ? 'e' + x.ex : 'b' + x.b, g = groups[groups.length - 1];
    if (g && g.key === key) g.idx.push(i); else groups.push({key, ex: x.ex, hint: x.hint, g: x.g, idx: [i]});
  });
  if (groups.some(g => !g.ex)) h += `<p class="hint" style="padding-bottom:8px">${t('garminHint')}</p>`;
  const hinted = s.sets.filter(x => !x.ex && x.hint && ex(x.hint)).length;
  if (hinted) h += `<button class="btn quiet" data-a="confirm-hints" data-sid="${esc(s.id)}" style="margin-bottom:8px">${t('confirmAll', hinted)}</button>`;
  h += groups.map((g, gi) => {
    const chips = g.idx.map(i => `<button data-a="edit-set" data-sid="${esc(s.id)}" data-i="${i}">${s.sets[i].w > 0 ? fW(s.sets[i].w) : t('bwShort')}<span class="x"> × </span>${s.sets[i].r}</button>`).join('');
    if (g.ex) return `<div class="group"><div class="group-head"><h2>${esc(exName(g.ex))}</h2></div><div class="chips">${chips}</div></div>`;
    const sug = g.hint && ex(g.hint);
    return `<div class="group unl"><div class="group-head"><h2>${t('unnamed')}${g.g ? ` <span class="muted" style="font-weight:400;font-size:14px">· Garmin: ${esc(g.g)}</span>` : ''}</h2>
      <span class="suggest">${sug ? `<button class="btn sm quiet" data-a="apply" data-sid="${esc(s.id)}" data-gi="${gi}" data-ex="${esc(sug.id)}">${esc(dispName(sug))}?</button>` : ''}<button class="btn sm ${sug ? 'quiet' : 'accent'}" data-a="name-group" data-sid="${esc(s.id)}" data-gi="${gi}">${sug ? t('other') : t('name')}</button></span></div>
      <div class="chips">${chips}</div></div>`;
  }).join('');
  h += `<div style="padding-top:24px"><button class="btn danger${armed === s.id ? ' armed' : ''}" data-a="delete-session" data-id="${esc(s.id)}">${armed === s.id ? t('confirmDel') : t('delWorkout')}</button></div>`;
  return h;
}

function vWorkout() {
  const s = active();
  if (!s) { nav.stack.pop(); return vWorkouts(); }
  let h = header({back: t('workouts'), title: t('today'), sub: fFull(s.date), right: `<button class="nav-btn strong" data-a="finish">${t('finish')}</button>`});
  const order = exOrder(s);
  if (!order.length) h += `<div class="empty"><b>${t('firstT')}</b>${t('firstD')}</div>`;
  for (const id of order) {
    const sets = s.sets.map((x, i) => [x, i]).filter(([x]) => x.ex === id);
    const last = lastFor(id, s.id);
    const d = drafts[id] || (drafts[id] = initDraft(id, s));
    let best = bestBefore(id, s.id);
    const rows = sets.map(([x, i], k) => {
      const v = e1rm(x.w, x.r), pr = best > 0 && v > best; if (v > best) best = v;
      return `<li><button class="set" data-a="edit-set" data-sid="${esc(s.id)}" data-i="${i}"><span class="n">${k + 1}</span><span>${x.w > 0 ? fW(x.w) + ' ' + t('kg') : t('bw')}<span class="x"> × </span>${x.r}</span>${pr ? `<span class="pr">${t('pr')}</span>` : ''}</button></li>`;
    }).join('');
    h += `<section class="block"><div class="block-head"><h2>${esc(exName(id))}</h2></div>
      <div class="ref">${last ? `${esc(fShort(last.date))}: ${last.sets.map(setShort).join('  ')}` : t('firstTime')}</div>
      ${rows ? `<ol class="sets">${rows}</ol>` : ''}
      <div class="labels"><span>${t('kg')}</span><span></span><span>${t('reps')}</span></div>
      <div class="entry" style="margin-top:4px">
        <div class="stepper"><button data-a="w" data-ex="${esc(id)}" data-d="-2.5" aria-label="${t('wMinus')}">−</button><input id="w-${esc(id)}" data-draft="w" data-ex="${esc(id)}" inputmode="decimal" value="${esc(d.w)}" placeholder="0" aria-label="${t('weightKg')}"><button data-a="w" data-ex="${esc(id)}" data-d="2.5" aria-label="${t('wPlus')}">+</button></div>
        <span class="times">×</span>
        <div class="stepper"><button data-a="r" data-ex="${esc(id)}" data-d="-1" aria-label="${t('rMinus')}">−</button><input id="r-${esc(id)}" data-draft="r" data-ex="${esc(id)}" inputmode="numeric" value="${esc(d.r)}" placeholder="0" aria-label="${t('repsCap')}"><button data-a="r" data-ex="${esc(id)}" data-d="1" aria-label="${t('rPlus')}">+</button></div>
        <button class="btn quiet add" data-a="add-set" data-ex="${esc(id)}">${t('logSet')}</button>
      </div></section>`;
  }
  h += `<div style="padding-top:20px"><button class="btn primary" data-a="pick">${t('addEx')}</button></div>`;
  return h;
}
function initDraft(id, s) {
  const own = s.sets.filter(x => x.ex === id);
  let ref = own[own.length - 1];
  if (!ref) { const l = lastFor(id, s.id); if (l) ref = l.sets.reduce((a, b) => b.w > a.w ? b : a); }
  return {w: ref ? numStr(ref.w) : '', r: ref ? String(ref.r) : ''};
}

function vExercises() {
  let h = header({title: t('exercises')});
  const withData = [], rest = [];
  for (const e of sortedEx()) { const hs = history(e.id); (hs.length ? withData : rest).push([e, hs]); }
  withData.sort((a, b) => a[1][a[1].length - 1].date < b[1][b[1].length - 1].date ? 1 : -1);
  if (withData.length) {
    h += `<div class="list">` + withData.map(([e, hs]) => {
      const last = hs[hs.length - 1], prev = hs[hs.length - 2];
      let delta = hs.length === 1 ? t('oneWorkout') : '';
      if (prev) { const d = last.w - prev.w; delta = d === 0 ? t('same') : t('vsPrev', (d > 0 ? '+' : '−') + fW(Math.abs(d))); }
      return `<button class="row" data-a="open-ex" data-id="${esc(e.id)}"><span class="t"><b>${esc(dispName(e))}</b><span>${esc(fShort(last.date))} · ${esc(delta)}</span></span>${spark(hs.slice(-10).map(x => x.w))}<span class="v"><b>${last.w > 0 ? fW(last.w) : t('bwShort')}</b><span>${last.w > 0 ? t('kg') : ''}</span></span><span class="chev">›</span></button>`;
    }).join('') + `</div>`;
  } else h += `<div class="empty"><b>${t('noTrendT')}</b>${t('noTrendD')}</div>`;
  if (rest.length) h += `<div class="section-title">${t('notYet')}</div><div class="list">` + rest.map(([e]) => `<button class="row" data-a="open-ex" data-id="${esc(e.id)}"><span class="t"><b style="font-weight:400">${esc(dispName(e))}</b></span><span class="chev">›</span></button>`).join('') + `</div>`;
  return h;
}
function sortedEx() {
  const gi = Object.fromEntries(GROUPS.map(([g], i) => [g, i]));
  return db.exercises.slice().sort((a, b) => (gi[a.group] - gi[b.group]) || ((a.order || 999) - (b.order || 999)) || dispName(a).localeCompare(dispName(b), loc()));
}
function spark(vals) {
  const W = 64, H = 24, p = 3;
  if (vals.length < 2) return `<svg width="${W}" height="${H}" aria-hidden="true"></svg>`;
  const mn = Math.min(...vals), mx = Math.max(...vals), sp = mx - mn || 1;
  const pts = vals.map((v, i) => [p + i * (W - 2 * p) / (vals.length - 1), H - p - (v - mn) / sp * (H - 2 * p)]);
  const l = pts[pts.length - 1];
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true" style="flex:none"><polyline points="${pts.map(q => q.map(n => n.toFixed(1)).join(',')).join(' ')}" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${l[0]}" cy="${l[1]}" r="3" fill="var(--accent)"/></svg>`;
}

let chart = null;
function vExercise(id) {
  const e = ex(id), hs = history(id);
  const metric = top().m || 'w';
  let h = header({back: t('exercises'), title: dispName(e), sub: altName(e)});
  if (!hs.length) return h + `<div class="empty"><b>${t('noRecT')}</b>${t('noRecD')}</div>`;
  const val = x => metric === 'w' ? x.w : x.e;
  const sel = hs.length - 1;
  chart = {hs, metric, sel};
  const first = hs[0], last = hs[hs.length - 1];
  const best = hs.reduce((a, b) => val(b) > val(a) ? b : a);
  const ch = val(first) ? (val(last) - val(first)) / val(first) * 100 : 0;
  h += `<div class="readout" id="readout"></div>
    <div class="seg" role="group" aria-label="${t('metric')}"><button data-a="metric" data-m="w" aria-pressed="${metric === 'w'}">${t('workW')}</button><button data-a="metric" data-m="e" aria-pressed="${metric === 'e'}">${t('e1rm')}</button></div>
    <div class="chart" id="chart"></div>
    <div class="trend"><div><b>${nf.format(val(best))} ${t('kg')}</b><span>${t('best')} · ${esc(fShort(best.date))}</span></div>${hs.length > 1 ? `<div><b>${ch >= 0 ? '+' : '−'}${nf.format(Math.abs(ch))}%</b><span>${esc(t('since', fShort(first.date)))}</span></div>` : ''}<div><b>${hs.length}</b><span>${t('wk')}</span></div></div>
    ${metric === 'e' ? `<p class="hint" style="padding-top:10px">${t('epley')}</p>` : ''}
    <div class="section-title">${t('history')}</div><div class="list">` +
    hs.slice().reverse().map(x => `<button class="row" data-a="open-session" data-id="${esc(x.sid)}"><span class="t"><b>${esc(fDay(x.date))}</b><span class="hist-sets">${x.sets.map(setShort).join('  ')}</span></span><span class="chev">›</span></button>`).join('') + `</div>`;
  return h;
}
function drawChart() {
  const box = $('#chart'); if (!box || !chart) return;
  const {hs, metric} = chart, val = x => metric === 'w' ? x.w : x.e;
  const W = Math.max(280, box.clientWidth), H = 200, pl = 36, pr = 12, pt = 12, pb = 24, iw = W - pl - pr, ih = H - pt - pb;
  const ts = hs.map(x => parseISO(x.date).getTime());
  let t0 = Math.min(...ts), t1 = Math.max(...ts);
  if (t0 === t1) { t0 -= 7 * 864e5; t1 += 7 * 864e5; }
  const vs = hs.map(val);
  let lo = Math.min(...vs), hi = Math.max(...vs);
  if (lo === hi) { lo -= 10; hi += 10; }
  const span = hi - lo, raw = span / 3, mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw);
  lo = Math.floor(lo / step) * step; hi = Math.ceil(hi / step) * step; if (lo < 0) lo = 0;
  const X = t => pl + (t - t0) / (t1 - t0) * iw, Y = v => pt + ih - (v - lo) / (hi - lo) * ih;
  let g = '';
  for (let v = lo; v <= hi + step / 2; v += step) g += `<line x1="${pl}" x2="${pl + iw}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--line)"/><text x="${pl - 8}" y="${Y(v) + 4}" text-anchor="end">${nf.format(v)}</text>`;
  const xi = hs.length === 1 ? [0] : [0, hs.length - 1];
  if (hs.length > 4) xi.splice(1, 0, Math.round((hs.length - 1) / 2));
  xi.forEach((i, k) => g += `<text x="${X(ts[i])}" y="${H - 4}" text-anchor="${xi.length === 1 ? 'middle' : k === 0 ? 'start' : k === xi.length - 1 ? 'end' : 'middle'}">${esc(fShort(hs[i].date))}</text>`);
  const pts = hs.map((x, i) => [X(ts[i]), Y(vs[i])]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('');
  const area = hs.length > 1 ? `<path d="${line}L${pts[pts.length - 1][0]},${pt + ih}L${pts[0][0]},${pt + ih}Z" fill="var(--accent)" opacity=".08"/>` : '';
  const s = chart.sel;
  box.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${t('trend')}">${g}${area}
    ${hs.length > 1 ? `<path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>` : ''}
    <line x1="${pts[s][0]}" x2="${pts[s][0]}" y1="${pt}" y2="${pt + ih}" stroke="var(--muted)" stroke-dasharray="0" stroke-width="1" opacity=".5"/>
    ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="${i === s ? 5 : 3}" fill="${i === s ? 'var(--accent)' : 'var(--bg)'}" stroke="var(--accent)" stroke-width="2"/>`).join('')}
    <rect x="${pl - 10}" y="0" width="${iw + 20}" height="${H}" fill="transparent" id="hit"/></svg>`;
  const x = hs[s];
  $('#readout').innerHTML = `<div class="big">${nf.format(vs[s])}<small>${t('kg')}</small></div><div class="when">${esc(fDay(x.date))} · ${esc(x.sets.map(setShort).join('  '))}</div>`;
  const pick = ev => {
    const r = box.getBoundingClientRect(), mx = (ev.clientX - r.left) * (W / r.width);
    let bi = 0; pts.forEach((p, i) => { if (Math.abs(p[0] - mx) < Math.abs(pts[bi][0] - mx)) bi = i; });
    if (bi !== chart.sel) { chart.sel = bi; drawChart(); }
  };
  const hit = box.querySelector('#hit');
  hit.addEventListener('pointerdown', pick); hit.addEventListener('pointermove', ev => { if (ev.buttons || ev.pointerType === 'mouse') pick(ev); });
}
addEventListener('resize', () => { if (top().v === 'exercise') drawChart(); });

function vSettings() {
  const n = db.sessions.length, sets = db.sessions.reduce((a, s) => a + s.sets.length, 0);
  const sub = cloud.user ? t('cloud', n, sets) : t('stored', n, sets);
  return header({back: t('workouts'), title: t('settings'), sub}) + acctHTML() + garminHTML() + `
    <div class="section-title" style="padding-top:4px">${t('language')}</div>
    <div class="seg" role="group" aria-label="${t('language')}" style="margin-bottom:24px"><button data-a="lang" data-l="ru" aria-pressed="${lang === 'ru'}">Русский</button><button data-a="lang" data-l="en" aria-pressed="${lang === 'en'}">English</button></div>
    <div class="stack">
      <label class="btn quiet" for="importFile">${t('import')}</label>
      <input type="file" id="importFile" accept="application/json,.json" hidden>
      <button class="btn quiet" data-a="export">${t('export')}</button>
    </div>
    <p class="hint" style="padding-top:14px">${t('dataHint')}</p>`;
}

/* ---------- sheets ---------- */
let sheetCtx = null;
function openSheet(html, ctx) { sheetCtx = ctx || null; $('#sheetPanel').innerHTML = html; $('#sheet').hidden = false; }
function closeSheet() { $('#sheet').hidden = true; $('#sheetPanel').innerHTML = ''; sheetCtx = null; }
function pickerHTML(title, q = '') {
  return `<div class="sheet-head"><h2>${esc(title)}</h2><button class="nav-btn" data-a="close-sheet">${t('done')}</button></div>
    <input class="search" id="exSearch" type="search" placeholder="${t('search')}" autocomplete="off" value="${esc(q)}" aria-label="${t('searchEx')}">
    <div class="sheet-scroll" id="pickList">${pickList(q)}</div>`;
}
function pickList(q) {
  q = q.trim().toLowerCase();
  const all = sortedEx(), hint = sheetCtx?.hint;
  const row = e => { const l = lastFor(e.id); return `<button class="row" data-pick="${esc(e.id)}"><span class="t"><b style="font-weight:400">${esc(dispName(e))}</b>${altName(e) ? `<span>${esc(altName(e))}</span>` : ''}</span><span class="v"><span>${l ? esc(setShort(l.sets.reduce((a, b) => b.w > a.w ? b : a))) : ''}</span></span></button>`; };
  let h = '';
  if (q) { const hits = all.filter(e => (e.name + ' ' + (e.en || '')).toLowerCase().includes(q)); h += hits.length ? `<div class="list">${hits.map(row).join('')}</div>` : ''; }
  else {
    if (hint && ex(hint)) h += `<div class="section-title" style="padding-top:8px">${t('garminThinks')}</div><div class="list">${row(ex(hint))}</div>`;
    for (const [g] of GROUPS) { const label = groupLabel(g); const items = all.filter(e => e.group === g); if (items.length) h += `<div class="section-title">${label}</div><div class="list">${items.map(row).join('')}</div>`; }
  }
  h += `<div class="section-title">${q ? t('notInList') : t('own')}</div>
    <div class="stack"><label class="field">${t('nameF')}<input id="newName" value="${esc(q ? cap(q) : '')}" placeholder="${t('namePh')}"></label>
    <label class="field">${t('group')}<select id="newGroup">${GROUPS.map(([g]) => `<option value="${g}">${groupLabel(g)}</option>`).join('')}</select></label>
    <button class="btn quiet" data-a="create-ex">${t('add')}</button></div>`;
  return h;
}
function editHTML(sid, i) {
  const s = db.sessions.find(x => x.id === sid), x = s.sets[i];
  return `<div class="sheet-head"><h2>${t('set')}</h2><button class="nav-btn" data-a="close-sheet">${t('cancel')}</button></div>
    <div class="stack"><div class="hint">${esc(x.ex ? exName(x.ex) : t('unnamed'))} · ${esc(fShort(s.date))}</div>
    <div class="pair"><label class="field">${t('weightKg')}<input id="editW" inputmode="decimal" value="${esc(numStr(x.w))}"></label><label class="field">${t('repsCap')}<input id="editR" inputmode="numeric" value="${x.r}"></label></div>
    <button class="btn primary" data-a="save-set">${t('save')}</button>
    <button class="btn quiet" data-a="move-set">${t('moveSet')}</button>
    <button class="btn danger${sheetCtx?.armed ? ' armed' : ''}" data-a="delete-set">${sheetCtx?.armed ? t('confirmDel') : t('delSet')}</button></div>`;
}

/* ---------- actions ---------- */
function groupIdx(s, gi) {
  const groups = [];
  s.sets.forEach((x, i) => { const key = x.ex ? 'e' + x.ex : 'b' + x.b, g = groups[groups.length - 1]; if (g && g.key === key) g.idx.push(i); else groups.push({key, idx: [i]}); });
  return groups[gi]?.idx || [];
}
function assign(sid, idxs, exId) {
  const s = db.sessions.find(x => x.id === sid);
  for (const i of idxs) { const x = s.sets[i]; x.ex = exId; delete x.b; delete x.hint; delete x.g; }
  persist(); toast(t('assigned', idxs.length, exName(exId))); render();
}
function addSet(id) {
  const s = active(), d = drafts[id];
  const w = num(d.w), r = Math.round(num(d.r));
  if (isNaN(w) || w < 0) { toast(t('needW')); $(`#w-${CSS.escape(id)}`)?.focus(); return; }
  if (!(r > 0)) { toast(t('needR')); $(`#r-${CSS.escape(id)}`)?.focus(); return; }
  const prev = Math.max(bestBefore(id, s.id), ...s.sets.filter(x => x.ex === id).map(x => e1rm(x.w, x.r)), 0);
  s.sets.push({ex: id, w: Math.round(w * 100) / 100, r});
  persist(); render();
  if (prev > 0 && e1rm(w, r) > prev) toast(t('newPr')); else toast(t('logged', setTxt({w, r})));
}

document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-a],[data-tab],[data-pick]'); if (!el) return;
  if (el.dataset.tab) { nav.tab = el.dataset.tab; nav.stack = []; armed = null; render(); scrollTo(0, 0); return; }
  if (el.dataset.pick) {
    const id = el.dataset.pick, c = sheetCtx; closeSheet();
    if (c.mode === 'add') { const s = active(); s.order = exOrder(s); if (!s.order.includes(id)) s.order.push(id); persist(); render(); requestAnimationFrame(() => scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})); }
    else if (c.mode === 'group') assign(c.sid, groupIdx(db.sessions.find(x => x.id === c.sid), c.gi), id);
    else if (c.mode === 'move') assign(c.sid, [c.i], id);
    return;
  }
  const a = el.dataset.a, s = db.sessions.find(x => x.id === (el.dataset.sid || el.dataset.id));
  switch (a) {
    case 'back': armed = null; pop(); break;
    case 'settings': push({v: 'settings'}); break;
    case 'start': {
      const n = {id: 'app-' + rid(), date: today(), startedAt: Date.now(), source: 'app', sets: [], order: []};
      db.sessions.push(n); db.active = n.id; persist(); push({v: 'workout'}); break;
    }
    case 'open-workout': push({v: 'workout'}); break;
    case 'finish': {
      const w = active();
      if (w && !w.sets.length) db.sessions = db.sessions.filter(x => x.id !== w.id);
      else if (w) w.finishedAt = Date.now();
      db.active = null; persist(); nav.stack = []; render(); scrollTo(0, 0);
      if (w?.sets.length) toast(t('savedW', w.sets.length));
      break;
    }
    case 'open-session': if (s && s.id === db.active) push({v: 'workout'}); else push({v: 'session', id: el.dataset.id}); break;
    case 'open-ex': push({v: 'exercise', id: el.dataset.id}); break;
    case 'metric': top().m = el.dataset.m; render(); break;
    case 'pick': openSheet(pickerHTML(t('exercise')), {mode: 'add'}); break;
    case 'name-group': { const gi = +el.dataset.gi, i0 = groupIdx(s, gi)[0]; openSheet(pickerHTML(t('whatWas')), {mode: 'group', sid: s.id, gi, hint: s.sets[i0]?.hint}); break; }
    case 'apply': assign(s.id, groupIdx(s, +el.dataset.gi), el.dataset.ex); break;
    case 'close-sheet': closeSheet(); break;
    case 'w': case 'r': {
      const id = el.dataset.ex, d = drafts[id], k = a;
      const v = Math.max(0, (num(d[k]) || 0) + parseFloat(el.dataset.d));
      d[k] = k === 'w' ? numStr(Math.round(v * 100) / 100) : String(Math.round(v));
      $(`#${k}-${CSS.escape(id)}`).value = d[k]; break;
    }
    case 'add-set': addSet(el.dataset.ex); break;
    case 'edit-set': openSheet('', {mode: 'edit', sid: s.id, i: +el.dataset.i}); $('#sheetPanel').innerHTML = editHTML(s.id, +el.dataset.i); break;
    case 'save-set': {
      const c = sheetCtx, x = db.sessions.find(q => q.id === c.sid).sets[c.i];
      const w = num($('#editW').value), r = Math.round(num($('#editR').value));
      if (isNaN(w) || w < 0 || !(r > 0)) { toast(t('checkWR')); return; }
      x.w = Math.round(w * 100) / 100; x.r = r; persist(); closeSheet(); render(); toast(t('saved')); break;
    }
    case 'move-set': { const c = sheetCtx, x = db.sessions.find(q => q.id === c.sid).sets[c.i]; sheetCtx = null; openSheet(pickerHTML(t('setEx')), {mode: 'move', sid: c.sid, i: c.i, hint: x.hint}); break; }
    case 'delete-set': {
      const c = sheetCtx;
      if (!c.armed) { c.armed = true; $('#sheetPanel').innerHTML = editHTML(c.sid, c.i); return; }
      const ss = db.sessions.find(q => q.id === c.sid); ss.sets.splice(c.i, 1);
      if (!ss.sets.length && ss.id !== db.active) db.sessions = db.sessions.filter(q => q.id !== ss.id);
      persist(); closeSheet(); if (!db.sessions.includes(ss)) nav.stack = []; render(); toast(t('setDel')); break;
    }
    case 'delete-session': {
      if (armed !== s.id) { armed = s.id; render(); setTimeout(() => { if (armed === s.id) { armed = null; render(); } }, 4000); return; }
      armed = null; db.sessions = db.sessions.filter(x => x.id !== s.id); persist(); pop(); toast(t('wDel')); break;
    }
    case 'create-ex': {
      const name = $('#newName').value.trim(); if (!name) { $('#newName').focus(); return; }
      const e = {id: 'c-' + rid(), name, en: name, group: $('#newGroup').value, order: 100 + db.exercises.length};
      db.exercises.push(e); persist();
      const pickBtn = document.createElement('button'); pickBtn.dataset.pick = e.id; document.body.appendChild(pickBtn); pickBtn.click(); pickBtn.remove();
      break;
    }
    case 'export': exportData(); break;
    case 'auth-mode': authMode = authMode === 'in' ? 'up' : 'in'; render(); break;
    case 'sync-now': if (garmin.status?.linked) garminPull(true); else sync(); break;
    case 'g-pull': garminPull(true); break;
    case 'g-unlink': garminCall('unlink').then(() => { garmin.status = {linked: false}; toast(t('gUnlinked')); render(); }); break;
    case 'confirm-hints': {
      const ss = db.sessions.find(q => q.id === el.dataset.sid); let n = 0;
      for (const x of ss.sets) if (!x.ex && x.hint && ex(x.hint)) { x.ex = x.hint; delete x.b; delete x.hint; delete x.g; n++; }
      persist(); render(); toast(t('assigned', n, '✓')); break;
    }
    case 'sign-out': {
      cloud.client.auth.signOut().finally(() => { cloud.user = null; cloud.last = null; db.pulledAt = null; persist(); render(); });
      break;
    }
    case 'lang': {
      lang = el.dataset.l; try { localStorage.setItem('gymlog.lang', lang); } catch {}
      setupFormat(); for (const k in drafts) delete drafts[k]; render(); break;
    }
  }
});
document.addEventListener('input', ev => {
  const el = ev.target;
  if (el.dataset.draft) drafts[el.dataset.ex][el.dataset.draft] = el.value;
  else if (el.id === 'exSearch') $('#pickList').innerHTML = pickList(el.value);
});
document.addEventListener('change', ev => { if (ev.target.id === 'importFile' && ev.target.files[0]) importFile(ev.target.files[0]); });
document.addEventListener('keydown', ev => { if (ev.key === 'Escape' && !$('#sheet').hidden) closeSheet(); });

async function importFile(file) {
  try {
    const d = JSON.parse(await file.text());
    let added = 0, exAdded = 0;
    for (const e of d.exercises || []) if (e.id && e.name && !ex(e.id)) { db.exercises.push(e); exAdded++; }
    for (const s of d.sessions || []) {
      if (!s.id || !s.date || !Array.isArray(s.sets) || db.sessions.some(x => x.id === s.id)) continue;
      db.sessions.push(s); added++;
    }
    persist(); render(); toast(added ? t('loaded', added) : t('noNew'));
  } catch { toast(t('badFile')); }
}
async function exportData() {
  const name = `zal-backup-${today()}.json`;
  const blob = new Blob([JSON.stringify(db)], {type: 'application/json'});
  const file = new File([blob], name, {type: 'application/json'});
  try { if (navigator.canShare?.({files: [file]})) { await navigator.share({files: [file], title: name}); return; } } catch (e) { if (e?.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

let tt;
function toast(m) { const box = $('#toast'); box.textContent = m; box.hidden = false; clearTimeout(tt); tt = setTimeout(() => box.hidden = true, 2200); }

if (db.active && active()) nav.stack = [{v: 'workout'}];
render();
initCloud();
if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
