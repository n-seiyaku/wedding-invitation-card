import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken, AUTH_COOKIE } from '../../lib/auth'
import { logout } from '../../authActions'
import getInfo from '../../api/getInfomation'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export default async function ProtectedPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get(AUTH_COOKIE)?.value
    const session = verifySessionToken(token)
    if (!session) {
        redirect('/login')
    }

    const rows = await getInfo()

    return (
        <div>
            <h1>Protected</h1>
            <p>Xin chao, {session.u}!</p>
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    px: { xs: 1, sm: 2 },
                }}
            >
                <Table
                    aria-label="Danh sach khach m?i"
                    stickyHeader
                    size="small"
                    sx={{
                        minWidth: 600,
                        '& th, & td': {
                            p: { xs: 0.75, sm: 1.25 },
                            fontSize: { xs: '0.85rem', md: '0.95rem' },
                            whiteSpace: { xs: 'nowrap', md: 'normal' },
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>STT</TableCell>
                            <TableCell align="right">Ten</TableCell>
                            <TableCell align="right">Xac nh?n</TableCell>
                            <TableCell align="right">Th?i gian</TableCell>
                            <TableCell align="right">L?i chuc</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row" sx={{ width: 56 }}>
                                    {index}
                                </TableCell>
                                <TableCell align="right" sx={{ maxWidth: { xs: 160, md: 'auto' } }}>
                                    {row.name}
                                </TableCell>
                                <TableCell
                                    sx={{ color: row.confirm ? 'success.light' : 'error.main' }}
                                    align="right"
                                >
                                    {row.confirm ? 'Tham gia' : 'Khong tham gia'}
                                </TableCell>
                                <TableCell align="right">
                                    {row.confirm_date ? new Date(row.confirm_date).toLocaleString('vi-VN') : ''}
                                </TableCell>
                                <TableCell align="right" sx={{ maxWidth: { xs: 160, md: 280 } }}>
                                    {row.message}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <form action={logout}>
                <button type="submit">Logout</button>
            </form>
        </div>
    )
}

